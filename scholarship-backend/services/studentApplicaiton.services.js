const db = require("../configuration/db.js");
const { sendEmail } = require("../middleware/mailing.middleware.js");

exports.stdApplicationToGov = async (req, res, next) => {
  try {
    const query = `
    SELECT 
      Applications.application_id, 
      Applications.full_name AS student_name, 
      Applications.father_name, 
      Applications.email, 
      Applications.phone, 
      Applications.dob, 
      Applications.aadhaar_no, 
      Applications.caste, 
      Applications.institute_name, 
      Applications.institute_code, 
      Applications.cgpa,
      Applications.application_date, 
      Applications.status, 
      Scholarships.program_name, 
      Scholarships.deadline AS scholarship_deadline,
      ApplicationDocuments.tenth_memo,
      ApplicationDocuments.twelth_memo,
      ApplicationDocuments.income_certificate,
      ApplicationDocuments.caste_certificate,
      ApplicationDocuments.bonafide
    FROM Applications 
    JOIN ApplicationDocuments ON Applications.application_id = ApplicationDocuments.application_id
    JOIN Scholarships ON Applications.scholarship_id = Scholarships.scholarship_id
    ORDER BY  
      FIELD(Applications.status, 'pending', 'accepted') ASC,  
      Applications.application_date DESC;
    `;

    const [applications] = await db.promise().query(query);

    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found" });
    }

    const basePath = "http://localhost:8080/";

    const applicationsWithLinks = applications.map((app) => {
      const files = [
        "tenth_memo",
        "twelth_memo",
        "income_certificate",
        "caste_certificate",
        "bonafide",
      ];

      const documentsWithLinks = files.reduce((acc, fileKey) => {
        if (app[fileKey]) {
          acc[fileKey] = `${basePath}${app[fileKey].replace(/\\/g, "/")}`;
        } else {
          acc[fileKey] = null;
        }
        return acc;
      }, {});

      return {
        application_id: app.application_id,
        student_name: app.student_name,
        father_name: app.father_name,
        email: app.email,
        phone: app.phone,
        dob: app.dob,
        aadhaar_no: app.aadhaar_no,
        caste: app.caste,
        institute_name: app.institute_name,
        institute_code: app.institute_code,
        cgpa: app.cgpa,
        application_date: app.application_date,
        status: app.status,
        program_name: app.program_name,
        deadline: app.scholarship_deadline,
        documents: documentsWithLinks,
      };
    });

    res.status(200).json(applicationsWithLinks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getApplicationsToStd = async (req, res, next) => {
  try {
    const [applications] = await db.promise().query(
      `
      SELECT a.application_id, s.program_name, a.application_date, s.deadline, a.status
      FROM Applications a
      JOIN Scholarships s ON a.scholarship_id = s.scholarship_id
      WHERE a.student_id = ?`,
      [req.userId]
    );

    res.status(200).send(applications);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.deleteApplication = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [existingApplication] = await db
      .promise()
      .query("SELECT * FROM Applications WHERE application_id = ?", [id]);

    if (existingApplication.length === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    const studentId = existingApplication[0].student_id;
    const scholarshipId = existingApplication[0].scholarship_id;

    const [studentDetails] = await db
      .promise()
      .query("SELECT * FROM Students WHERE student_id = ?", [studentId]);

    const [scholarshipDetails] = await db
      .promise()
      .query("SELECT * FROM Scholarships WHERE scholarship_id = ?", [
        scholarshipId,
      ]);

    if (!studentDetails.length || !scholarshipDetails.length) {
      return res.status(404).json({
        message: "Related student or scholarship not found.",
      });
    }

    const email = studentDetails[0].email;
    const studentName = studentDetails[0].name;
    const scholarshipName = scholarshipDetails[0].program_name;

    const subject = "Application Declined";
    const text = `Dear ${studentName},\n\nWe regret to inform you that your application for the ${scholarshipName} scholarship has been declined. We encourage you to explore other opportunities.\n\nBest regards,\nThe Scholarship Team.`;

    if (email) {
      sendEmail(email, subject, text);
    }

    await db
      .promise()
      .query("DELETE FROM ApplicationDocuments WHERE application_id = ?", [id]);

    await db
      .promise()
      .query("DELETE FROM Applications WHERE application_id = ?", [id]);

    res.status(200).json({
      message:
        "Application has been declined, deleted successfully, and an email has been sent to the student.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.approveApplication = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [existingApplication] = await db
      .promise()
      .query("SELECT * FROM Applications WHERE application_id = ?", [id]);

    if (existingApplication.length === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    const [studentDetails] = await db
      .promise()
      .query("SELECT * FROM Students WHERE student_id = ?", [
        existingApplication[0].student_id,
      ]);

    const [scholarshipDetails] = await db
      .promise()
      .query("SELECT * FROM Scholarships WHERE scholarship_id = ?", [
        existingApplication[0].scholarship_id,
      ]);

    if (!studentDetails.length || !scholarshipDetails.length) {
      return res.status(404).json({
        message: "Related student or scholarship not found.",
      });
    }

    await db
      .promise()
      .query(
        "UPDATE Applications SET status = 'accepted' WHERE application_id = ?",
        [id]
      );

    const email = studentDetails[0].email;
    const studentName = studentDetails[0].name;
    const scholarshipName = scholarshipDetails[0].program_name;

    const subject = "Application Accepted";
    const text = `Dear ${studentName},\n\nCongratulations! Your application for the ${scholarshipName} scholarship has been accepted.\n\nWe look forward to supporting your educational journey.\n\nBest regards,\nThe Scholarship Team.`;

    if (email) {
      sendEmail(email, subject, text);
    }

    res.status(200).json({
      message:
        "Application has been accepted successfully and an email has been sent to the student.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.submitApplication = async (req, res, next) => {
  const {
    scholarship_id,
    fullName,
    fatherName,
    email,
    phone,
    dob,
    aadhaarNo,
    caste,
    instituteName,
    instituteCode,
    cgpa,
  } = req.body;

  const application_date = new Date();

  const student_id = req.userId;

  const files = req.files;
  const tenthMemo = files.tenthMemo ? files.tenthMemo[0].path : null;
  const twelthMemo = files.twelthMemo ? files.twelthMemo[0].path : null;
  const incomeCertificate = files.incomeCertificate
    ? files.incomeCertificate[0].path
    : null;
  const casteCertificate = files.casteCertificate
    ? files.casteCertificate[0].path
    : null;
  const bonafide = files.bonafide ? files.bonafide[0].path : null;

  if (
    !student_id ||
    !scholarship_id ||
    !fullName ||
    !aadhaarNo ||
    !dob ||
    !tenthMemo ||
    !twelthMemo
  ) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const [result] = await db.promise().query(
      `INSERT INTO Applications (student_id, scholarship_id, application_date, full_name, father_name, email, phone, dob, aadhaar_no, caste, institute_name, institute_code, cgpa)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        student_id,
        scholarship_id,
        application_date,
        fullName,
        fatherName,
        email,
        phone,
        dob,
        aadhaarNo,
        caste,
        instituteName,
        instituteCode,
        cgpa,
      ]
    );

    const application_id = result.insertId;

    await db.promise().query(
      `INSERT INTO ApplicationDocuments (application_id, tenth_memo, twelth_memo, income_certificate, caste_certificate, bonafide)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        application_id,
        tenthMemo,
        twelthMemo,
        incomeCertificate,
        casteCertificate,
        bonafide,
      ]
    );

    res.status(201).json({
      message: "Application submitted successfully",
      application_id: application_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
