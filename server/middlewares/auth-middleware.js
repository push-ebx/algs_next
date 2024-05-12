const jwt = require('jsonwebtoken')
require('dotenv').config({path: "../.env"});
const userService = require('../services/user-service');

module.exports = async function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }

  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(200).json({
        error: {
          code: 401,
          error_message: "Пользователь не авторизован"
        }
      })
    }

    req.user_id = jwt.verify(token, process.env.SECRET).id;
    const res = await userService.getUser(req.user_id)
    req.role = res.role;
    next()
  } catch (e) {
    console.log(e)
    return res.status(200).json({
      error: {
        code: 401,
        error_message: "Пользователь не авторизован"
      }
    })
  }
}