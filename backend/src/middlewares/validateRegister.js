function validateRegister(req, res, next) {
  const { username, email, password } = req.body || {};

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "username, email and password are required" });
  }

  if (!String(email).includes("@")) {
    return res.status(400).json({ message: "Email is invalid" });
  }

  if (String(password).length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  return next();
}

module.exports = { validateRegister };
