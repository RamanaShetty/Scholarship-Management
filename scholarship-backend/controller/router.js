const { Router } = require("express");
const multer = require("multer");

const registrations = require("../services/registration.services.js");
const login = require("../services/login.services.js");
const scholarship = require("../services/scholarship.services.js");
const {
  tokenAuthentication,
} = require("../middleware/authentication.middleware.js");
const stdApplication = require("../services/studentApplicaiton.services.js");

const router = Router({ strict: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
}).fields([
  { name: "tenthMemo", maxCount: 1 },
  { name: "twelthMemo", maxCount: 1 },
  { name: "incomeCertificate", maxCount: 1 },
  { name: "casteCertificate", maxCount: 1 },
  { name: "bonafide", maxCount: 1 },
]);

//
router.post("/api/v1/login", login.loginUser);

//
router.post("/api/std/v1/registration", registrations.studentRegistration);

//
router.post(
  "/api/std/v1/submit",
  upload,
  tokenAuthentication,
  stdApplication.submitApplication
);

//
router.get(
  "/api/scholarship/v1",
  tokenAuthentication,
  scholarship.getAvailableScholarships
);

//
router.post(
  "/api/gov/v1/scholarship",
  tokenAuthentication,
  scholarship.addition
);

//
router.get(
  "/api/std/applications/v1",
  tokenAuthentication,
  stdApplication.getApplicationsToStd
);

//
router.delete(
  "/api/scholarship/v1/:id",
  tokenAuthentication,
  scholarship.deleteScholarship
);

//
router.put(
  "/api/scholarship/v1/:id",
  tokenAuthentication,
  scholarship.updateScholarship
);

//
router.get(
  "/api/std/v1/application",
  tokenAuthentication,
  stdApplication.stdApplicationToGov
);
//
router.put(
  "/api/std/v1/approve/:id",
  tokenAuthentication,
  stdApplication.approveApplication
);
//
router.delete(
  "/api/std/v1/decline/:id",
  tokenAuthentication,
  stdApplication.deleteApplication
);

// router.post("/api/inst/v1/registration", registrations.instituteRegistration);
// router.post("/api/inst/v1/login", login.instLogin);

// router.get(
//   "/api/inst/v1/application",
//   tokenAuthentication,
//   applicaitons.instApplication
// );
// router.put(
//   "/api/inst/v1/approve",
//   tokenAuthentication,
//   applicaitons.instApprove
// );
// router.delete(
//   "/api/inst/v1/decline",
//   tokenAuthentication,
//   applicaitons.instDecline
// );

module.exports = router;
