const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: async (req, res, next) => {
    const token = req.headers.authorization;
    try {
      if (token) {
        const payload = await jwt.verify(token, process.env.SECRET);
        req.user = payload;
        return next();
      } else {
        res.status(400).json({ error: "Token Required" });
      }
    } catch (err) {
      next(err);
    }
  },
};