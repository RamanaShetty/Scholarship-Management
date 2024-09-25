const db = require("../configuration/db.js");

exports.addition = async (req, res, next) => {
  const {
    program_name,
    description,
    eligibility,
    benefits,
    deadline,
    required_documents,
  } = req.body;

  try {
    let role = req.role;
    if (role !== "government") {
      res
        .status(403)
        .send({ message: "You are not authorized to do this action" });
    } else {
      const date_of_addition = new Date();
      const [result] = await db
        .promise()
        .query(
          `INSERT INTO scholarships (program_name,date_of_addition,description,eligibility,benefits,deadline,required_documents) VALUES(?, ?, ?, ?, ?, ?, ?)`,
          [
            program_name,
            date_of_addition,
            description,
            eligibility,
            benefits,
            deadline,
            required_documents,
          ]
        );
      res.status(201).send({ message: "Scholarship added successful" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.getAvailableScholarships = async (req, res, next) => {
  try {
    const [rows] = await db
      .promise()
      .query(
        `SELECT scholarship_id, program_name, description, eligibility, benefits, deadline, required_documents FROM scholarships WHERE status = 'active'`
      );

    if (rows.length === 0) {
      return res.status(404).send({ message: "No scholarships available" });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.deleteScholarship = async (req, res, next) => {
  const { id } = req.params;

  console.log("inside");
  try {
    const [result] = await db
      .promise()
      .query("DELETE FROM Scholarships WHERE scholarship_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `No scholarship found with ID ${id}`,
      });
    } else {
      return res.status(200).json({
        message: `Scholarship with ID ${id} was deleted successfully.`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateScholarship = async (req, res, next) => {
  const { id } = req.params;
  console.log("inside");
  const {
    program_name,
    description,
    eligibility,
    benefits,
    deadline,
    required_documents,
  } = req.body;

  try {
    const [result] = await db.promise().query(
      `UPDATE Scholarships 
         SET program_name = ?, 
             description = ?, 
             eligibility = ?, 
             benefits = ?, 
             deadline = ?, 
             required_documents = ? 
         WHERE scholarship_id = ?`,
      [
        program_name,
        description,
        eligibility,
        benefits,
        deadline.split("T")[0],
        required_documents,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `No scholarship found with ID ${id}`,
      });
    } else {
      return res.status(200).json({
        message: `Scholarship with ID ${id} was updated successfully.`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
