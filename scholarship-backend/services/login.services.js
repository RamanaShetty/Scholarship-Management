const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const db = require("../configuration/db");
const { sendEmail } = require("../middleware/mailing.middleware.js");

exports.loginUser = async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res
      .status(400)
      .send({ message: "Email, password, and role are required" });
  }

  try {
    let user = null;
    let query = "";
    let idField = "";

    if (role === "student") {
      query = "SELECT * FROM students WHERE email=?";
      idField = "student_id";
    } else if (role === "government") {
      query = "SELECT * FROM admins WHERE email=?";
      idField = "admin_id";
    } else {
      return res.status(400).send({ message: "Invalid role specified" });
    }

    const [result] = await db.promise().query(query, [email]);
    if (result.length === 0) {
      return res.status(404).send({
        message: `${
          role === "student" ? "Student" : "Government admin"
        } not found`,
      });
    }

    user = result[0];

    if (role === "student") {
      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send({ message: "Password is incorrect" });
      }
    }

    const token = sign({ id: user[idField], role }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    return res.status(200).send({ token, message: "Login successful", role });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};