const jwt = require("jsonwebtoken");

/**
 * Express middleware — verifies Bearer JWT token.
 * Optionally accepts a `role` to enforce role-based access.
 * Usage:
 *   router.get("/protected", requireAuth(), handler)
 *   router.get("/admin-only", requireAuth("admin"), handler)
 */
function requireAuth(role) {
  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No autorizado" });
    }
    try {
      const secret = process.env.JWT_SECRET || "dev_secret_change_in_production";
      const decoded = jwt.verify(header.slice(7), secret);
      req.user = decoded;
      if (role && decoded.role !== role) {
        return res.status(403).json({ error: "Acceso denegado" });
      }
      next();
    } catch {
      res.status(401).json({ error: "Token inválido o expirado" });
    }
  };
}

module.exports = requireAuth;
