const jwt = require('jsonwebtoken')
require('dotenv').config({path: "../.env"});

module.exports = function (req, res, next) {
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

    req.user_id = jwt.verify(token, process.env.SECRET).id
    req.role = jwt.verify(token, process.env.SECRET).role
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