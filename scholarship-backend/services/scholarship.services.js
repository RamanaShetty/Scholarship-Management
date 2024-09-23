const db = require("../configuration/db.js");
const cron = require("node-cron");

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
