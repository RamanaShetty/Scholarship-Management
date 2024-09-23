import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

// Scholarships data (can be fetched from an API)
const scholarships = {
    liveScholarships: [
        {
            id: 1,
            title: "SBIF ASHA SCHOLARSHIP PROGRAM FOR SCHOOL STUDENTS",
            award: "INR 15,000 each",
            eligibility: "For class 6 to 12 students",
            daysLeft: "8 days to go",
            about: `The SBIF Asha Scholarship Program 2024, one of India's largest scholarship programs, is an initiative of the SBI Foundation under its education vertical - Integrated Learning Mission (ILM). This program aims to provide financial assistance to meritorious students from low-income families across India, ensuring the continuity of their education. This scholarship is open to students from Class 6 to 12 and for those who are pursuing undergraduate and postgraduate courses from the top 100 NIRF universities/colleges and IITs or MBA/PGDM courses from IIMs. Selected students can receive a scholarship of up to INR 7.5 lakh to support their educational endeavors.`,
            eligibilityDetails: [
                "Applicants must be studying in Class 6 to 12 in the current academic year.",
                "Students must have secured 75% marks or above in their previous academic year.",
                "The gross annual family income of the applicants must be up to INR 3,00,000.",
                "Open for Indian nationals."
            ],
            benefits: "INR 15,000 each",
            documents: [
                "Marksheet from the previous academic year (Class 10/Class 12/Graduation/Postgraduation, as applicable)",
                "Government-issued identity proof (Aadhaar card)",
                "Current year fee receipt",
                "Proof of current year admission (admission letter/institution identity card/bonafide certificate)",
                "Bank account details of the applicant (or parent)",
                "Proof of income (Form 16A/income certificate from a government authority/salary slips, etc.)",
                "Photograph of the applicant",
                "Caste Certificate (Wherever Applicable)"
            ],
            deadline: "01-Oct-2024"
        },
        {
            id: 2,
            title: "BUDDY4STUDY - ICICI BANK DOMESTIC EDUCATION LOAN PROGRAMME",
            award: "Loan up to INR 1 crore",
            eligibility: "Open for Indian students pursuing higher education.",
            daysLeft: "15 days to go",
            about: `Buddy4Study - ICICI Bank Education Loan Programme is a joint initiative offered by the ICICI Bank and Buddy4Study to financially support Indian students for pursuing higher education in India or abroad. Under this programme, students willing to pursue an undergraduate, postgraduate or postgraduate diploma in professional courses will be provided with a loan amount ranging from INR 1 crore for education in India to INR 2 crore for education abroad. The interest rate starts at 9.85% per annum and the loan tenure is up to 12 years.`,
            eligibilityDetails: [
                "Open for Indian students who are studying in or applying to undergraduate, postgraduate and PG diploma courses from recognized and accredited colleges/universities in India.",
                "Applicants must have passed Class 12/Diploma/Graduation.",
                "Applicants must be aged between 16 and 35 years.",
                "Applicants must have a good academic record."
            ],
            benefits: "Loan up to INR 1 crore",
            documents: [
                "2 photographs of the student (passport-size)",
                "Copy of exam mark sheets of 10th/12th or latest education certificate",
                "Admission letter with cost of education, if available",
                "Aadhaar Card and PAN card of the student and Parent/ Guardian"
            ],
            deadline: "30-Sep-2024"
        },
        {
            id: 3,
            title: "SOF-INTERNATIONAL GENERAL KNOWLEDGE OLYMPIAD (IGKO) 2024-25",
            award: "Up to ₹50,000 and other awards",
            eligibility: "For Class 1 to 10 students",
            daysLeft: "22 days to go",
            about: `SOF-International General Knowledge Olympiad (IGKO) 2024-25 is an opportunity provided by the Science Olympiad Foundation (SOF) for Class 1 to 10 students. It is a single-level exam that will be judged at four different levels - school level, city level, zonal level, and international level. The selected students stand a chance to receive up to ₹50,000, medals, and certificates. Science Olympiad Foundation (SOF) is an educational organisation that was established to promote Science, Mathematics, Computer Education, English, Social Studies, General Knowledge and professional courses.`,
            eligibilityDetails: [
                "To be eligible, an applicant must be studying in Class 1 to 10 in a recognised institution/school."
            ],
            benefits: "International, Zonal & Class topper awards will be provided to SOF IGKO winners. Each winner will be entitled to one award for an exam. The award comprises participation certification for each student.",
            documents: [],
            deadline: "30-Sep-2024"
        },
        {
            id: 4,
            title: "KOTAK KANYA SCHOLARSHIP 2024-25",
            award: "INR 1.5 lakh* per year",
            eligibility: "Meritorious girls in the first year of graduation programs",
            daysLeft: "30 days to go",
            about: `Kotak Kanya Scholarship is a collaborative CSR Project of Kotak Mahindra Group companies and Kotak Education Foundation to promote education and livelihood among economically disadvantaged sections of society. This scholarship aims to offer financial assistance to meritorious girl students from low-income families to empower them to pursue higher studies in professional education after Class 12. Under Kotak Kanya Scholarship 2024-25, girl students who have passed Class 12 and aspire to pursue professional graduation courses like Engineering, MBBS, BDS, Integrated LLB (5 Years), B. Pharmacy, B.Sc. Nursing, Integrated BS-MS/BS-Research, in ISER, IISC (Bangalore), or other professional courses (Design, Architecture, etc.) from institutes of repute (NAAC/NIRF accredited) will be provided scholarship of INR 1.5 lakh* per year to pay their educational expenses until graduation (degree).`,
            eligibilityDetails: [
                "Open for meritorious girl students across India.",
                "Applicants must have scored 75% or more marks or equivalent CGPA in Class 12 board examinations.",
                "Applicant's annual family income must be less than INR 6,00,000.",
                "Meritorious girl students who have secured admission to the first year of graduation programs in the academic year 2024-25 in institutes of repute like NIRF/NAAC accredited for professional graduation degrees like Engineering, MBBS, BDS, Integrated LLB (5 Years), B.Sc. Nursing, B. Pharmacy, Integrated BS-MS/BS-Research in ISER, IISC (Bangalore), or other professional courses (Design, Architecture, etc.).",
                "Children of employees of Kotak Mahindra Group, Kotak Education Foundation and Buddy4Study are not eligible to apply for the Kotak Kanya Scholarship 2024-25."
            ],
            benefits: `Scholarship amount of INR 1.5 lakh* per year will be given to each selected scholar till completion of her professional graduation course/degree. The scholarship amount under Kotak Kanya Scholarship 2024-25 should be utilised to cover academic expenses including tuition fees, hostel fees, internet, transportation, laptops, books and stationery.`,
            documents: [
                "Marksheet of previous qualifying examination (Class 12)",
                "Income proof of parents/guardians",
                "ITR of parents for FY 2023-24 (if available)",
                "Fee structure (for academic year 2024-25)",
                "Bonafide student certificate/letter from college",
                "College seat allocation document",
                "College entrance examination scorecard",
                "Aadhaar card",
                "Bank passbook",
                "A passport-size photograph",
                "Disability certificate (if applicable)",
                "Death certificate of parent (for single parent/orphan candidates)",
                "Photographs of the house"
            ],
            deadline: "30-Sep-2024"
        }
        ,
        {
            id: 5,
            title: "CHEVENING SCHOLARSHIPS 2025-26",
            award: "A fully-funded scholarship for the course for a year and other benefits",
            eligibility: "Students pursuing a master's degree in the UK",
            daysLeft: "40 days to go",
            about: `Chevening Scholarships 2025-26 is an opportunity provided by the Government of the United Kingdom in collaboration with the UK Universities to provide financial assistance to Indian students with outstanding leadership and influencing skills who wish to pursue a one-year master's degree in any subject at any UK university. Selected candidates will receive a fully-funded scholarship for a year for the course and other benefits.`,
            eligibilityDetails: [
                "Be a citizen of a Chevening-eligible country or territory, including India.",
                "Hold an undergraduate degree that enables entry into a postgraduate program at a UK university before applying (Note: This is typically equivalent to an upper second-class 2:1 honors degree in the UK but can vary depending on the course and university choice).",
                "Have at least two years of work experience (equivalent to 2,800 hours).",
                "Return to India for a minimum of two years after the scholarship ends.",
                "Note: Applicants who hold refugee status in a Chevening-eligible country are eligible for a scholarship."
            ],
            benefits: `Selected candidates will receive the following benefits:
            - University course tuition fees
            - A monthly stipend
            - Travel costs to and from the UK
            - An arrival allowance
            - A homeward departure allowance
            - The cost of one visa application
            - A travel grant to attend Chevening events in the UK`,
            documents: [
                "A valid passport/National ID card",
                "University transcripts and degrees (undergraduate, postgraduate)",
                "An unconditional offer letter from a UK university",
                "Names of two referees who know the applicant in a professional or academic capacity",
                "English language test score"
            ],
            deadline: "05-Nov-2024"
        }
        
    ],
    upcomingScholarships: [
        {
            id: 6,
            title: "COMMONWEALTH SHARED SCHOLARSHIPS 2024-25",
    award: "A monthly stipend up to £1,652, tuition fees, and other benefits",
    eligibility: "Postgraduate applicants",
    daysLeft: "21-11-2024",
    about: `Commonwealth Shared Scholarships 2024-25 is a joint initiative of the Commonwealth Scholarship Commission (CSC) and UK universities to support students from developing Commonwealth countries who are willing to pursue PG courses in an institution in the United Kingdom (UK). The aim of the CSSS is to assist students from developing Commonwealth countries who are of excellent academic calibre but for financial reasons unable to afford to study in the United Kingdom. Under this scholarship, selected students will receive approved tuition fees, a monthly stipend of up to £1,652, and other benefits.`,
    eligibilityDetails: [
        "Be a citizen of or have been granted refugee status by an eligible Commonwealth country.",
        "Be a permanent resident of an eligible Commonwealth country.",
        "Be available to start academic studies in the UK academic year in September/October 2024.",
        "Have obtained a bachelor's degree with a grade point average of at least 60% marks.",
        "Not have studied or worked for one (academic) year or more in a high-income country.",
        "Be unable to afford to study in a UK university without this scholarship."
    ],
    benefits: `Selected students will receive the following benefits:
    - Commonwealth Scholarship Commission (CSC) will cover the cost of economy-class airfare from the scholar's home country to the UK and back at the end of their studies. The CSC will not reimburse the cost of airfare for dependents or for travel undertaken before the scholarship is confirmed.
    - Full tuition fees will be covered by an agreement between the CSC and the UK university. Scholars will not be responsible for paying any portion of their tuition fees.
    - Scholars will receive a living allowance (stipend) of £1,347 per month, or £1,652 per month if they are attending a university in the London metropolitan area. This stipend will be paid directly to scholars by their university.
    - Warm Clothing Allowance: Scholars may be eligible for a warm clothing allowance if they are studying in a cold climate. This allowance will be paid by the scholar's university.
    - Thesis grant towards the cost of preparing a thesis or dissertation, where applicable – paid by the university, funded by the CSC.
    - Study travel grant towards the cost of study-related travel within the UK or overseas – paid by the university, funded by the CSC.
    - If a scholar requires a mandatory TB test for their visa application, the CSC will contribute towards the cost of the test. Scholars will need to provide receipts for any TB (Tuberculosis) test expenses they incur.`,
    documents: [
        "Copy of a valid passport (or national ID card) showing the following details:",
        "Photograph",
        "Date of Birth (DOB)",
        "Country of citizenship as proof of citizenship or refugee status in an eligible Commonwealth country",
        "Full transcripts detailing all the higher education qualifications including to-date transcripts for any qualifications the applicant is currently studying (with certified translations if not in English)"
    ],
    deadline: "21-11-2024"
        },
        {
            id: 7,
            title: "NORTH SOUTH FOUNDATION (NSF) SCHOLARSHIP 2023-24",
            award: "Up to INR 30,000 per annum",
            eligibility: "Class 12 passed students",
            daysLeft: "25-12-2024",
            about: `North South Foundation (NSF) Scholarship 2023-24 is an opportunity offered by North South Foundation (NSF), USA (non-profit organization) to Class 12 passed students entering into Engineering, Medicine, or 3-year polytechnic (diploma in engineering) based on merit and financial need. The selected candidates will receive up to INR 30,000 per annum.`,
            eligibilityDetails: [
                "Have secured admission to one of the following professional courses in a government college (including seats in government aided colleges):",
                "Engineering",
                "Architecture",
                "Medicine (MBBS, BAMS, and BDS)",
                "B.V.Sc.",
                "B. Pharmacy",
                "B.Sc (Agriculture)",
                "B.Sc (Nursing)",
                "Diploma in Engineering (Polytechnic)",
                "Diploma in Agriculture.",
                "Be among the top 10 percent in the state or national ranks.",
                "Belong to a family of low-income class (below the poverty line)."
            ],
            benefits: `Over 3,000 selected candidates will receive annual financial assistance up to INR 30,000.`,
            documents: [
                "Photograph of the applicant.",
                "Applicant's family photograph.",
                "College admission card.",
                "CET/JEE/NEET rank card (attested).",
                "Bonafide certificate from the college into which the student secured admission.",
                "Receipts or proof of tuition fees paid in Class 10 and 12/diploma.",
                "Income Certificate issued by a Revenue Official or any other competent authority.",
                "Aadhaar card/ration card.",
                "Declaration by the Principal.",
                "Certificates showing marks secured from Class 10 to 12 duly attested or diploma duly attested by the Head of the institution.",
                "Proof of tuition fees paid/payable per annum duly certified by college authorities."
            ],
            deadline: "25-12-2024"
        }
        ,
        {
            id: 8,
            title: "BABA GURBACHAN SINGH SCHOLARSHIP SCHEME 2023-24",
            award: "INR 50,000 per annum or tuition/annual fee (whichever is less)",
            eligibility: "Students pursuing a diploma in Engineering or specified degree courses",
            daysLeft: "31-12-2024",
            about: `Baba Gurbachan Singh Scholarship Scheme 2023-24 is offered by the Education Department of Sant Nirankari Mandal to meritorious students pursuing a diploma in Engineering or one of the specified degree courses. The selected candidates will receive annual financial assistance of INR 50,000 or a tuition fee/annual fee (whichever is less). Sant Nirankari Mandal is a Nirankari spiritual organisation that works to help needy and meritorious students of India.`,
            eligibilityDetails: [
                "Be pursuing a diploma in Engineering or a degree in one of the following courses from a recognized Institution in India:",
                "B.A./B.A. (Hons)",
                "B.Com./B.Com (Hons)",
                "B-Pharma",
                "D-Pharma",
                "B.Ed",
                "DElEd",
                "B.Sc. in Hotel Management",
                "BBA",
                "BCA",
                "M.Com",
                "M.Sc.",
                "M.A.",
                "MCA",
                "Diploma/degree or training in any Sport, Instrumental, Music/Vocal Music.",
                "Have secured a minimum of 60% marks in Class 10 and 12.",
                "Have annual family income below INR 3,50,000."
            ],
            benefits: `The selected students will receive annual financial assistance of INR 50,000 per student or the tuition fee or annual fee, whichever is less.`,
            documents: [
                "Passport size photograph.",
                "Marksheets of Class 10-12.",
                "Pay slip and ITR form.",
                "Affidavit (Part-III of Application Form).",
                "Copy of results of all semesters’ examinations passed.",
                "Copy of latest fee receipts issued by the university/institute.",
                "Detailed fee structure including tuition fee, library, hostel, books, etc. duly signed by the administrator/principal of the institute.",
                "Copy of student’s passbook of saving bank account.",
                "Copy of bank statements of all family members.",
                "Admission slip/letter provided by the university/educational institution.",
                "Copy of Aadhaar card/Ration card/Voter ID card/Passport/PAN card.",
                "Copy of letter received previous year from Education Department, SNM (for old students only)."
            ],
            deadline: "31-12-2024"
        }
        ,
                    
    ],
    alwaysOpenScholarships: [
        {
            id: 9,
            title: "Kalinga Sikhya Sathi Yojana (KSSY)",
            award: "Education loan up to 10,00,000",
    about: "Kalinga Sikhya Sathi Yojana (KSSY) is an educational loan scheme initiated by the Government of Odisha to alleviate the financial burden on higher education students. Under KSSY, students can avail a maximum loan of ₹10,00,000 at a mere 1% interest rate. The Odisha Higher Education Department subsidizes the remaining interest. The scheme covers a wide range of courses, including medicine, engineering, law, and management.",
    eligibility: [
        "The applicant must be a resident/domicile of the state of Odisha.",
        "The family's annual income should not exceed ₹6,00,000.",
        "The student must not be receiving similar benefits from another government or institution.",
        "The course of study must be in Management, Integrated Law, Engineering, or Medicine.",
        "The institution offering the course must be established by an Act of Parliament, State Legislature, or recognized by relevant statutory bodies."
    ],
    benefits: "The scheme applies to students availing education loans up to ₹10,00,000 from scheduled banks, covering all courses offered in institutions eligible for the Government of India Interest Subvention under the CSIS scheme. Financial assistance in the form of interest subvention will reduce the net interest payable by the student to 1% per annum after the moratorium.",
    documents: [
        "Two passport-sized photographs of the applicant(s)",
        "Proof of Identity/Age (For student, co-applicant, guarantor)",
        "Any two of the following documents, but one from options 1-5 is mandatory:",
        "Ration card",
        "Voter's identity card",
        "PAN card",
        "Passport",
        "Driving license",
        "Office identity card",
        "Birth certificate",
        "School leaving certificate"
    ],
    deadline: "Always Open"
        },
        {
            id: 10,
            title: "Indian Bank Education Loan (IBA) Scheme",
    award: "Loan amount between INR 4 lakh to INR 25 lakh",
    eligibility: "Always Open",
    eligibilityDetails: [
        "Applicants must have secured admission in undergraduate or postgraduate courses in India or abroad (based on merit or through an entrance test).",
        "Applicants must have completed Higher Secondary level (10+2 or equivalent) education.",
        "Applicants can apply for the scheme to pursue various programs such as graduation, postgraduation, diploma, or degree courses in either India or abroad.",
        "Eligible applicants include Indian citizens, Non-Resident Indians (NRIs), Persons of Indian Origin (PIOs), Overseas Citizens of India (OCIs), or individuals born abroad."
    ],
    benefits: `The selected candidates will receive a loan ranging from INR 4 lakh to INR 25 lakh. 
    The candidates who are pursuing Executive Management Program/Executive MBA across India will receive a maximum loan limit of INR 25 lakh.
    Margin money requirements are:
        - Up to INR 4 lakh: 0% margin money for studies in India or abroad.
        - Between INR 4 lakh and INR 7.5 lakh: 5% margin money for studies in India, 15% for studies abroad.
        - Above INR 7.5 lakh: 15% margin money for studies in India, 20% for studies abroad.
        - Up to INR 25 lakh (for Executive Management Program/Executive MBA): 25% margin money (for studies in India only).`,
    documents: [
        "Application form with three passport-size photographs",
        "Assets and liabilities statement in the bank’s prescribed format from the applicant(s), co-applicant(s), and guarantor(s)",
        "Aadhaar card/Permanent Account Number (PAN) card/voter identification card/passport/driving license",
        "Admission letter/bonafide student certificate from the college/university (must include fee structure)",
        "Details regarding the source of funds to meet the margin (must be supported by documentary evidence)",
        "Declaration/affidavit stating that no other educational loan has been availed from any other bank by the applicant and their parents",
        "Copy of sale deed and related documents (if immovable property is offered as collateral security)",
        "Recent telephone bill/electricity bill/property tax receipt",
        "Marksheet (Class 10, 12, graduation, or last qualifying examination)",
        "Community certificate (if applicable)",
        "Income certificate issued by the designated authority",
        "Passport and visitors International Stay Admission (VISA) to study abroad",
        "Details of parents/guardian/co-obligation/guarantor",
        "Copy of liquid securities (if offered as collateral)",
        "Income proof"
    ],
    deadline: "Always Open"},
        {
            id: 11,
            title: "Manchester Humanities International Excellence Scholarship 2024",
            about: "Manchester Humanities International Excellence Scholarship 2024 is an opportunity provided by the University of Manchester to students enrolled in postgraduate courses at the university. Selected candidates will receive a tuition fee discount of up to £5,000 (approx. ₹4,17,138.75).",
            award: "Tuition fee discount up to £5,000 (approx. ₹4,17,138.75)",
            eligibility: "Always Open",
            eligibilityDetails: [
                "Be a citizen of one of the following countries:",
                "India",
                "Canada",
                "Cyprus",
                "France",
                "Germany",
                "Greece",
                "Hong Kong",
                "Indonesia",
                "Italy (including Sardinia)",
                "Japan",
                "Malaysia",
                "Nigeria",
                "Pakistan",
                "Portugal",
                "USA"
            ],
            benefits: [
                "For programmes with tuition fees below or equal to £28,000: £2,500 (approx. ₹2,08,569.38)",
                "For programmes with tuition fees above £28,000 and all listed programmes in the Manchester Institute of Education: £5,000 (approx. ₹4,17,138.75)"
            ],
            documents: [
                "A valid passport",
                "Academic transcripts including degrees and marksheets of the previous qualifying examination",
                "Admission letter/fee receipt",
                "A disability certificate (if applicable)",
                "TOEFL scorecard (if applicable)"
            ],
            deadline: "Always Open"}
    ]
};

const allScholarships = [
    ...scholarships.liveScholarships,
    ...scholarships.upcomingScholarships,
    ...scholarships.alwaysOpenScholarships,
];

const ScholarshipDetails = () => {
    const { id } = useParams();
    const scholarship = allScholarships.find(s => s.id === parseInt(id));

    if (!scholarship) {
        return <Typography>Scholarship not found</Typography>;
    }

    return (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', backgroundColor: '#f0e6f6' }}>
            <div style={{ backgroundColor: '#d8bfd8', padding: '20px', borderRadius: '8px' }}>
                <Typography variant="h4" style={{ color: '#4b0082', textAlign: 'left' }}>{scholarship.title}</Typography>
                <hr style={{ border: '1px solid #4b0082', margin: '10px 0' }} />
                <Typography variant="h6" style={{ color: '#4b0082', textAlign: 'left' }}>Award: {scholarship.award}</Typography>
                <Typography variant="h6" style={{ color: '#4b0082', textAlign: 'left' }}>Deadline: {scholarship.deadline}</Typography>
                {scholarship.daysLeft && <Typography variant="body1" style={{ color: '#4b0082', textAlign: 'left' }}>Days Left: {scholarship.daysLeft}</Typography>}
            </div>

            <div style={{ marginTop: '20px', textAlign: 'left' }}>
                <Typography variant="h6" style={{ marginTop: '20px' }}>About The Program</Typography>
                <Typography variant="body1">{scholarship.about}</Typography>
                <Typography variant="h6" style={{ marginTop: '20px' }}>Eligibility Criteria:</Typography>
                {Array.isArray(scholarship.eligibilityDetails) ? (
                    <ul>
                        {scholarship.eligibilityDetails.map((item, index) => (
                            <li key={index}>
                                <Typography variant="body2" style={{ color: '#000000' }}>{item}</Typography>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <Typography variant="body2" style={{ color: '#000000' }}>{scholarship.eligibility}</Typography>
                )}
                <Typography variant="h6" style={{ marginTop: '20px' }}>Benefits:</Typography>
                <Typography variant="body1">{scholarship.benefits}</Typography>
                <Typography variant="h6" style={{ marginTop: '20px' }}>Required Documents:</Typography>
                <ul>
                    {scholarship.documents.map((doc, index) => (
                        <li key={index}><Typography variant="body2" style={{ color: '#000000' }}>{doc}</Typography></li>
                    ))}
                </ul>
                <Typography variant="h6" style={{ marginTop: '20px' }}>Deadline:</Typography>
                <Typography variant="body1">{scholarship.deadline}</Typography>
                <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>Apply Now</Button>
            </div>
        </Paper>
    );
};

export default ScholarshipDetails;