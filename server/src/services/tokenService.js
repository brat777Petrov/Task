const jwt = require("jsonwebtoken");
const { readFile, writeFile } = require("./fileService");
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require("./../config");

class tokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: "3h",
    });

    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  // async removeToken(refreshToken) {}

  // async findToken(refreshToken) {}
}

module.exports = new tokenService();
