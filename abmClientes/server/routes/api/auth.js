const { Router } = require("express");
const jwt = require("jsonwebtoken");

const router = Router();

/**
 * POST /api/auth/login
 * Body: { username, password }
 * Returns: { token, user: { id, username, role } }
 *
 * Credentials are read from environment variables.
 * Defaults for local development only — set proper values in .env for production.
 */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (!username || !password) {
    return res.status(400).json({ error: "Usuario y contraseña requeridos" });
  }

  if (username !== adminUsername || password !== adminPassword) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  const secret = process.env.JWT_SECRET || "dev_secret_change_in_production";
  const payload = { id: 1, username: adminUsername, role: "admin" };
  const token = jwt.sign(payload, secret, { expiresIn: "8h" });

  res.json({ token, user: payload });
});

module.exports = router;
