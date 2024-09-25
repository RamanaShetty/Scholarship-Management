const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const db = require("../configuration/db");
const { sendEmail } = require("../middleware/mailing.middleware.js");

function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

exports.studentRegistration = async (req, res, next) => {
  const {
    name,
    email,
    password,
    phone,
    address,
    age,
    GPA,
    institute_name,
    institute_code,
  } = req.body;

  try {
    console.log(req.body);
    const [existingStudent] = await db
      .promise()
      .query("SELECT * FROM students WHERE email = ?", [email]);

    if (existingStudent.length > 0) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await hash(password, 10);

    const [result] = await db.promise().query(
      `INSERT INTO Students (name, email, password, phone, address, age, GPA, institute_name, institute_code)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        hashedPassword,
        phone,
        address,
        Number(age),
        Number(GPA),
        institute_name,
        institute_code,
      ]
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

// exports.instituteRegistration = async (req, res, next) => {
//   const {
//     institute_name,
//     institute_code,
//     affiliation_details,
//     institute_address,
//     institute_contact,
//     head_of_institution_name,
//     head_of_institution_contact,
//     email,
//     password,
//   } = req.body;

//   try {
//     const [existingStudent] = await db
//       .promise()
//       .query("SELECT * FROM institutes WHERE email = ?", [email]);

//     if (existingStudent.length > 0) {
//       return res.status(400).json({ message: "Email is already registered" });
//     }

//     const hashedPassword = await hash(password, 10);

//     const currentDate = new Date();
//     const dateString = `${currentDate.getFullYear()}`;
//     const randomSuffix = Math.floor(10 + Math.random() * 90);
//     const registration_number = `${institute_code}${dateString}${randomSuffix}`;

//     const [instituteResult] = await db.promise().query(
//       `INSERT INTO Institutes (
//                   institute_name, institute_code, affiliation_details, 
//                   institute_address, institute_contact, 
//                   head_of_institution_name, head_of_institution_contact,email, 
//                   password, registration_number
//               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         institute_name,
//         institute_code,
//         affiliation_details,
//         institute_address,
//         institute_contact,
//         head_of_institution_name,
//         head_of_institution_contact,
//         email,
//         hashedPassword,
//         registration_number,
//       ]
//     );

//     if (email) {
//       const to = email;
//       const subject = "Registration Successfull";
//       const text = `Hey ${capitalize(
//         head_of_institution_name
//       )},\n\n      Your esteeemed Institute has successfully registered to our website. Please wait, until your application is approved by the authority. Your registration number is " ${registration_number} ", this is necessary for further logins.\n\nThank you,\nRamana Gowirshetty. `;

//       await sendEmail(to, subject, text);
//     }

//     res.status(201).send({
//       registration_number,
//       message: "Institute registration is in pending",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// };
