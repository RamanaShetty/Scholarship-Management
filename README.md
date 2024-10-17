# Scholarship Management

## Project Description

Scholarship Management is a system designed to manage scholarships, applications, and students' information efficiently. The system allows administrators to add, update, and manage scholarships, while students can apply for these scholarships by providing their details and necessary documents.

## Installation Instructions

### Backend

1. Clone the repository.
2. Navigate to the backend directory and run the following command to install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the backend directory and add the following details:

   ```env
   PORT=
   DB_HOST=
   DB_USER=
   DB_PASSWORD=
   DB_DATABASE=
   JWT_SECRET=
   NODE_ENV=

   MAIL_USER=
   MAIL_PASS=
   ```

4. Run the server with:
   ```bash
   npm run start
   ```

### Frontend

1. Navigate to the frontend directory and run the following command to install dependencies:
   ```bash
   npm install
   ```
2. Start the frontend server with:
   ```bash
   npm run dev
   ```

### Database Setup

Use the following schema to create the necessary tables in your MySQL database:

```sql
CREATE TABLE Admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE Students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    age INT
);

CREATE TABLE Scholarships (
    scholarship_id INT AUTO_INCREMENT PRIMARY KEY,
    date_of_addition DATE,
    program_name VARCHAR(100),
    description TEXT,
    eligibility TEXT,
    benefits TEXT,
    deadline DATE,
    required_documents TEXT,
    status ENUM('active', 'inactive') DEFAULT 'active'
);

CREATE TABLE Applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    scholarship_id INT,
    full_name VARCHAR(255),
    father_name VARCHAR(255),
    email VARCHAR(100),
    phone VARCHAR(15),
    dob DATE,
    aadhaar_no VARCHAR(12),
    caste VARCHAR(50),
    institute_name VARCHAR(255),
    institute_code VARCHAR(50),
    cgpa DECIMAL(3,2),
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    application_date DATE,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (scholarship_id) REFERENCES Scholarships(scholarship_id)
);

CREATE TABLE ApplicationDocuments (
    document_id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT,
    tenth_memo VARCHAR(255),
    twelth_memo VARCHAR(255),
    income_certificate VARCHAR(255) NULL,
    caste_certificate VARCHAR(255) NULL,
    bonafide VARCHAR(255),
    FOREIGN KEY (application_id) REFERENCES Applications(application_id)
);

```

## Sample Data

```
INSERT INTO Scholarships (date_of_addition, program_name, description, eligibility, benefits, deadline, required_documents)
VALUES
('2024-01-15', 'National Merit Scholarship', 'Awarded to high-achieving students based on standardized test scores.', 'Top 10% of standardized test scores.', 'Full tuition and monthly stipend.', '2024-10-15', 'High school transcript, test scores'),
('2024-02-05', 'Community Service Scholarship', 'For students who demonstrate exceptional commitment to community service.', 'Minimum 100 hours of community service.', 'Up to $5,000 per year for educational expenses.', '2024-11-30', 'Proof of community service, recommendation letters'),
('2024-03-10', 'STEM Excellence Scholarship', 'Supports students pursuing degrees in Science, Technology, Engineering, and Mathematics.', 'GPA above 3.5, majoring in STEM fields.', 'Covers tuition, books, and supplies for four years.', '2024-12-01', 'Transcript, recommendation letters'),
('2024-04-20', 'Artistic Achievement Scholarship', 'For students who demonstrate exceptional talent in the arts.', 'Portfolio submission and GPA above 3.0.', 'Awards up to $10,000 for tuition and project funding.', '2024-09-30', 'Portfolio, recommendation letters'),
('2024-05-01', 'Diversity and Inclusion Scholarship', 'Encourages diversity in higher education by supporting underrepresented students.', 'Enrolled in college with a focus on diversity.', 'Provides a one-time award of $3,000 for tuition or related costs.', '2024-11-15', 'Personal statement, proof of enrollment'),
('2024-06-12', 'International Student Scholarship', 'Supports international students pursuing undergraduate degrees.', 'International students with a GPA above 3.0.', 'Partial tuition waiver and living stipend.', '2024-10-31', 'Passport, transcript, recommendation letters'),
('2024-07-14', 'Future Leaders Scholarship', 'For students who demonstrate leadership qualities and community involvement.', 'GPA above 3.5, leadership experience.', 'Covers up to $7,500 in tuition fees and mentorship program.', '2024-12-20', 'Leadership experience report, transcript'),
('2024-08-21', 'Science and Technology Scholarship', 'For students excelling in science and technology fields.', 'Majoring in science or technology with GPA above 3.0.', 'Full tuition and internship opportunities.', '2024-11-05', 'Transcript, research experience details'),
('2024-09-10', 'Education for All Scholarship', 'Aims to support students from low-income backgrounds in accessing education.', 'Family income below $40,000 per year.', 'Full tuition coverage and stipend for living expenses.', '2024-12-15', 'Income proof, transcript');

```

## Usage

There are two user roles in the Scholarship Management system:

### 1. Students:

- **View Scholarships**: Students can browse through the list of available scholarships.
- **Apply for Scholarships**: Students can fill out the application form, upload the required documents, and submit their application for a scholarship.
- **Check Application Status**: Students can view the status of their submitted applications, which could be 'pending', 'accepted', or 'rejected'.

### 2. Government (Admins):

- **Manage Scholarships**: Government users can add new scholarships, edit existing ones, or delete scholarships that are no longer relevant.
- **Review Applications**: Government users can view the list of student applications for each scholarship and accept or decline these applications based on eligibility and other criteria.

## Tech Stack

- **Frontend:** ReactJS, Material-UI (MUI)
- **Backend:** NodeJS, ExpressJS
- **Database:** MySQL

## Licence

This updated `README.md` now includes the enhanced **Usage** and **Technologies** sections. Let me know if you need any more adjustments!
