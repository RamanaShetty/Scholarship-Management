const { Router } = require("express");

const registrations = require("../services/registration.services.js");
const login = require("../services/login.services.js");
const scholarship = require("../services/scholarship.services.js");
const {
  tokenAuthentication,
} = require("../middleware/authentication.middleware.js");
const applicaitons = require("../services/applications.services.js");

const router = Router({ strict: true });

router.post("/api/std/v1/registration", registrations.studentRegistration);
router.post("/api/std/v1/login", login.stdLogin);

router.post("/api/inst/v1/registration", registrations.instituteRegistration);
router.post("/api/inst/v1/login", login.instLogin);

router.post("/api/gov/v1/login", login.govLogin);
router.post(
  "/api/gov/v1/scholarship",
  tokenAuthentication,
  scholarship.addition
);

router.get(
  "/api/scholarship/v1",
  tokenAuthentication,
  scholarship.getAvailableScholarships
);

router.get(
  "/api/inst/v1/application",
  tokenAuthentication,
  applicaitons.instApplication
);
router.put(
  "/api/inst/v1/approve",
  tokenAuthentication,
  applicaitons.instApprove
);
router.delete(
  "/api/inst/v1/decline",
  tokenAuthentication,
  applicaitons.instDecline
);

router.get(
  "/api/std/v1/application",
  tokenAuthentication,
  applicaitons.stdApplication
);
router.delete(
  "/api/std/v1/decline",
  tokenAuthentication,
  applicaitons.deleteApplication
);

module.exports = router;
