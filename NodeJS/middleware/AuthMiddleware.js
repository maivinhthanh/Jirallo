const jwtHelper = require("../helpers/jwt.helper");
require('dotenv').config()

const accessTokenSecret = process.env.ACCESS_TOKEN || "s0me-secr3t-goes-here";

module.exports = async (req, res, next) => {
  const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"] || req.get('Authorization')
  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
      req.jwtDecoded = decoded;
      req.userId = decoded.data.userId
      next();
    } catch (error) {
      return res.status(203).json({
        message: 'Unauthorized.',
      });
    }
  } else {
    return res.status(203).send({
      message: 'No token provided.',
    });
  }
}
