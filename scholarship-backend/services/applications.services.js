const db = require("../configuration/db.js");
const { sendEmail } = require("../middleware/mailing.middleware.js");

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

    const [institute] = await db
      .promise()
      .query(`SELECT email FROM Institutes WHERE registration_number = ?`, [
        registration_number,
      ]);

    if (institute.length > 0) {
      const email = institute[0].email;
      const subject = "Registration Successful";
      const text = `Hey Institute,\n\nYour application for registration has been approved. You can now proceed to manage your institute's profile and other activities on the scholarship management platform.\n\nThank you,\nScholarship Management Team.`;

      try {
        await sendEmail(email, subject, text);
        console.log(`Email sent to ${email}`);
      } catch (emailError) {
        console.error(`Error sending email: ${emailError.message}`);
      }
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
    const [institute] = await db.promise().query(
      `SELECT email, institute_name 
       FROM Institutes 
       WHERE registration_number = ?`,
      [registration_number]
    );

    if (institute.length === 0) {
      return res
        .status(404)
        .json({ message: "Institute not found or already removed" });
    }

    const { email, institute_name } = institute[0];

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

    if (email) {
      const to = email;
      const subject = "Institute Registration Declined";
      const text = `Dear Institute,\n\nWe regret to inform you that your registration for the institute ${institute_name} has been declined and your account has been removed from the system.\n\nThank you for your understanding.\n\nBest regards,\nScholarship Management Team`;

      try {
        sendEmail(to, subject, text);
        console.log(`Email sent to ${email}`);
      } catch (emailError) {
        console.error(`Error sending email: ${emailError.message}`);
      }
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
