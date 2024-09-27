const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const db = require("../configuration/db");
const { sendEmail } = require("../middleware/mailing.middleware.js");

function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

exports.studentRegistration = async (req, res, next) => {
  const { name, email, password, age } = req.body;

  try {
    const [existingStudent] = await db
      .promise()
      .query("SELECT * FROM students WHERE email = ?", [email]);

    if (existingStudent.length > 0) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await hash(password, 10);

    const [result] = await db.promise().query(
      `INSERT INTO Students (name, email, password, age)
        VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, Number(age)]
    );

    const token = sign(
      { id: result.insertId, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(201).send({
      token,
      message: "Student registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
