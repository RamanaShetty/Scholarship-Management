const { Router } = require("express");

const registrations = require("../services/registration.js");
const login = require("../services/login.js");
const { tokenAuthentication } = require("../middleware/authentication.js");

const router = Router({ strict: true });

router.post("/api/std/v1/registration", registrations.studentRegistration);
router.post("/api/std/v1/login", login.stdLogin);

router.post("/api/inst/v1/registration", registrations.instituteRegistration);
router.post("/api/inst/v1/login", login.instLogin);

module.exports = router;
