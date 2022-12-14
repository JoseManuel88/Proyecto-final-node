const User = require("../../api/users/users.model");
const { verifyJwt } = require("../jwt/jwt");


const isAuth = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(500).json("Unauthorized");
       };
      const parsedToken = token.replace("Bearer ", "");
      const validToken = verifyJwt(parsedToken);
      const userLogged = await User.findById(validToken.id);
  
      userLogged.password = null;
      req.user = userLogged;
      next();
    } catch (error) {
      return next(error);
    }
  };

module.exports = {isAuth};
