const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const db = require("../configuration/db");
const { sendEmail } = require("../middleware/mailing.middleware.js");

exports.loginUser = async (req, res, next) => {
  const { email, password, student, government } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  try {
    let user = null;
    let role = "";

    if (student) {
      const [stdFind] = await db
        .promise()
        .query("SELECT * FROM students WHERE email=?", [email]);

      if (stdFind.length === 0) {
        return res.status(404).send({ message: "Student not found" });
      }
      user = stdFind[0];
      role = "student";
      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send({ message: "Password is incorrect" });
      }
    } else if (government) {
      console.log(government);
      const [adminFind] = await db
        .promise()
        .query("SELECT * FROM admins WHERE email=?", [email]);

      if (adminFind.length === 0) {
        return res.status(404).send({ message: "Government admin not found" });
      }
      user = adminFind[0];
      role = "government";
    } else {
      return res.status(400).send({ message: "Invalid login type" });
    }

    let token = "";
    if (role === "student") {
      token = sign({ id: user.student_id, role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    } else {
      token = sign({ id: user.admin_id, role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    }

    // res.cookie("token", token);

    console.log(token);
    return res.status(200).send({ token, message: "Login successful", role });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

// exports.instLogin = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const [instFind] = await db
//       .promise()
//       .query(`SELECT * FROM Institutes WHERE email = ?`, [email]);

//     if (instFind.length === 0) {
//       res.status(404).send({ message: "Institute Not Found" });
//     } else {
//       if (!instFind[0].registration_approved) {
//         res.status(403).send({ message: "Application is not yet approved" });
//       } else {
//         const isMatch = await compare(password, instFind[0].password);
//         if (!isMatch) {
//           res.status(401).send({ message: "Invalid password" });
//         } else {
//           const token = sign(
//             { id: instFind[0].institute_id, role: "institute" },
//             process.env.JWT_SECRET,
//             {
//               expiresIn: "1h",
//             }
//           );

//           console.log(token);
//           res.cookie("token", token);
//           res.status(200).send({ token: token, message: "Login successful" });
//         }
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// };
