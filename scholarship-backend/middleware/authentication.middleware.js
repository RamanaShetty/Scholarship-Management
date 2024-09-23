const { verify } = require("jsonwebtoken");

exports.tokenAuthentication = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(500).send({ message: "Token authentication failed" });
    }

    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};
