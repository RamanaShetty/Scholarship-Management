const db = require("../configuration/db.js");
const { sendEmail } = require("../middleware/mailing.middleware.js");

exports.stdApplication = async (req, res, next) => {
  try {
    const query = `
      SELECT 
        Applications.application_id,
        Students.name AS student_name,
        Scholarships.program_name,
        Students.institute_name,
        Applications.application_date,
        Scholarships.deadline AS deadline_date,
        Applications.status,
        Applications.submitted_documents 
      FROM Applications
      JOIN Students ON Applications.student_id = Students.student_id
      JOIN Scholarships ON Applications.scholarship_id = Scholarships.scholarship_id;
    `;

    const [applications] = await db.promise().query(query);

    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found" });
    }

    const basePath = "http://localhost:8080/";

    const applicationsWithLinks = applications.map((app) => {
      const normalizedPath = app.submitted_documents.replace(/\\/g, "/");

      return {
        ...app,
        download_link: `${basePath}${normalizedPath}`,
      };
    });

    res.status(200).json(applicationsWithLinks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteApplication = async (req, res, next) => {
  const { application_id } = req.body;
  try {
    const [existingApplication] = await db
      .promise()
      .query("SELECT * FROM Applications WHERE application_id = ?", [
        application_id,
      ]);

    if (existingApplication.length === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    await db
      .promise()
      .query("DELETE FROM Applications WHERE application_id = ?", [
        application_id,
      ]);

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.approveApplication = async (req, res, next) => {
  const { application_id } = req.body;

  try {
    const [existingApplication] = await db
      .promise()
      .query("SELECT * FROM Applications WHERE application_id = ?", [
        application_id,
      ]);

    if (existingApplication.length === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    await db
      .promise()
      .query(
        "UPDATE Applications SET status = 'accepted' WHERE application_id = ?",
        [application_id]
      );

    res.status(200).json({ message: "Application approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.submitApplication = async (req, res, next) => {
  const { student_id, scholarship_id } = req.body;
  const application_date = new Date();
  const submitted_document_path = req.file ? req.file.path : null;

  if (!student_id || !scholarship_id || !submitted_document_path) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [result] = await db.promise().query(
      `INSERT INTO Applications (student_id, scholarship_id, application_date, submitted_documents)
       VALUES (?, ?, ?, ?)`,
      [student_id, scholarship_id, application_date, submitted_document_path]
    );

    const [student] = await db
      .promise()
      .query(`SELECT email FROM Students WHERE student_id = ?`, [student_id]);

    // if (student.length > 0) {
    //   const email = student[0].email;
    //   const subject = "Application Submitted Successfully";
    //   const text = `Dear Student,\n\nYour application has been submitted successfully. You can check your application status on the portal.\n\nThank you,\nScholarship Management Team.`;

    //   sendEmail(email, subject, text);
    //   console.log(`Email sent to ${email}`);
    // }

    res.status(201).json({
      message: "Application submitted successfully",
      application_id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
