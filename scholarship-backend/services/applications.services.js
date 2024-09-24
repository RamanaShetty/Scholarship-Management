const db = require("../configuration/db.js");

exports.instApplication = async (req, res, next) => {
  try {
    const [institutes] = await db.promise().query(
      `SELECT registration_number, institute_name, institute_code, head_of_institution_name, head_of_institution_contact 
       FROM Institutes`
    );

    if (institutes.length === 0) {
      return res
        .status(404)
        .json({ message: "No institute applications found" });
    }

    res.status(200).json(institutes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.instApprove = async (req, res, next) => {
  const { registration_number } = req.body;

  if (!registration_number) {
    return res.status(400).json({ message: "Registration number is required" });
  }

  try {
    const [result] = await db.promise().query(
      `UPDATE Institutes 
       SET registration_approved = 1 
       WHERE registration_number = ?`,
      [registration_number]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Institute not found or already approved" });
    }

    res
      .status(200)
      .json({ message: "Institute registration approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.instDecline = async (req, res, next) => {
  const { registration_number } = req.body;

  if (!registration_number) {
    return res.status(400).json({ message: "Registration number is required" });
  }

  try {
    const [result] = await db.promise().query(
      `DELETE FROM Institutes 
       WHERE registration_number = ?`,
      [registration_number]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Institute not found or already removed" });
    }

    res.status(200).json({
      message:
        "Institute registration declined and institution deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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
        Applications.status
      FROM Applications
      JOIN Students ON Applications.student_id = Students.student_id
      JOIN Scholarships ON Applications.scholarship_id = Scholarships.scholarship_id;
    `;

    const [applications] = await db.promise().query(query);

    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found" });
    }

    res.status(200).json(applications);
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
