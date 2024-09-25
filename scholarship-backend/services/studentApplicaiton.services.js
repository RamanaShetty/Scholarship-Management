const db = require("../configuration/db.js");
const { sendEmail } = require("../middleware/mailing.middleware.js");

exports.stdApplicationToGov = async (req, res, next) => {
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

    await db
      .promise()
      .query("DELETE FROM Applications WHERE application_id = ?", [id]);

    res.status(200).json({ message: "Application deleted successfully" });
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

    await db
      .promise()
      .query(
        "UPDATE Applications SET status = 'accepted' WHERE application_id = ?",
        [id]
      );

    res.status(200).json({ message: "Application approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.submitApplication = async (req, res, next) => {
  const { scholarship_id } = req.body;
  const application_date = new Date();
  const submitted_document_path = req.file ? req.file.path : null;

  if (!req.userId || !scholarship_id || !submitted_document_path) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [result] = await db.promise().query(
      `INSERT INTO Applications (student_id, scholarship_id, application_date, submitted_documents)
       VALUES (?, ?, ?, ?)`,
      [req.userId, scholarship_id, application_date, submitted_document_path]
    );

    res.status(201).json({
      message: "Application submitted successfully",
      application_id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
