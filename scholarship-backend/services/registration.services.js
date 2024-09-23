const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const db = require("../configuration/db");

exports.studentRegistration = async (req, res, next) => {
  const { name, email, password, phone, address, age, GPA } = req.body;

  try {
    const [existingStudent] = await db
      .promise()
      .query("SELECT * FROM students WHERE email = ?", [email]);

    if (existingStudent.length > 0) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await hash(password, 10);

    const [result] = await db.promise().query(
      `INSERT INTO Students (name, email, password, phone, address, age, GPA)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, phone, address, age, GPA]
    );

    const token = sign(
      { id: result.insertId, role: "student" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });
    res.status(201).json({
      message: "Student registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.instituteRegistration = async (req, res, next) => {
  const {
    institute_name,
    institute_code,
    affiliation_details,
    institute_address,
    institute_contact,
    head_of_institution_name,
    head_of_institution_contact,
    email,
    password,
  } = req.body;

  try {
    const [existingStudent] = await db
      .promise()
      .query("SELECT * FROM institutes WHERE email = ?", [email]);

    if (existingStudent.length > 0) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await hash(password, 10);

    const currentDate = new Date();
    const dateString = `${currentDate.getFullYear()}`;
    const randomSuffix = Math.floor(10 + Math.random() * 90);
    const registration_number = `${institute_code}${dateString}${randomSuffix}`;

    const [instituteResult] = await db.promise().query(
      `INSERT INTO Institutes (
                  institute_name, institute_code, affiliation_details, 
                  institute_address, institute_contact, 
                  head_of_institution_name, head_of_institution_contact,email, 
                  password, registration_number
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        institute_name,
        institute_code,
        affiliation_details,
        institute_address,
        institute_contact,
        head_of_institution_name,
        head_of_institution_contact,
        email,
        hashedPassword,
        registration_number,
      ]
    );

    const institute_id = instituteResult.insertId;

    await db.promise().query(
      `INSERT INTO instituteregistrations (
      institute_id, submitted_date) VALUES (?, ?);
      `,
      [institute_id, currentDate]
    );

    res.status(201).send({
      registration_number,
      message: "Institute registration is in pending",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
