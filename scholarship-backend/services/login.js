const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const db = require("../configuration/db");

exports.stdLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const [stdFind] = await db
      .promise()
      .query("SELECT * FROM students WHERE email=?", [email]);

    if (stdFind.length === 0) {
      res.status(404).send({ message: "Student not found" });
    }

    const isMatch = await compare(password, stdFind[0].password);
    if (!isMatch) {
      res.status(401).send({ message: "Password is incorrect" });
    }

    const token = sign(
      { id: stdFind.student_id, role: "student" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });
    res.status(200).send({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.instLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const [instFind] = await db
      .promise()
      .query(`SELECT * FROM Institutes WHERE email = ?`, [email]);

    if (instFind.length === 0) {
      res.status(404).send({ message: "Institute Not Found" });
    } else {
      if (!instFind[0].registration_approved) {
        res.status(403).send({ message: "Application is not yet approved" });
      } else {
        const isMatch = await compare(password, instFind[0].password);
        if (!isMatch) {
          res.status(401).send({ message: "Invalid password" });
        } else {
          const token = sign(
            { id: instFind.institute_id, role: "institute" },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );

          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000,
          });
          res.status(200).send({ message: "Login successful" });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
