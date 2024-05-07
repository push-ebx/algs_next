const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const generateAccessToken = (id, role) => {
  const payload = {id, role}
  return jwt.sign(payload, process.env.SECRET, {expiresIn: "365d"})
}

class AuthController {
  async registration(req, res) {
    try {
      const {username, password} = req.body;
      const [users] = await mysql.query(`SELECT username FROM users WHERE username='${username}'`);

      if (users.length) {
        return res.send({
          status: 'error',
          success: false,
          message: 'Пользователь с таким именем уже зарегистрирован!'
        })
      }

      const hash_password = bcrypt.hashSync(password, 7)

      await mysql.query(`INSERT INTO users (username, hash_password, role) VALUES ('${username}', '${hash_password}', 'user');`);
      const [[{id}]] = await mysql.query(`SELECT LAST_INSERT_ID() as id;`);
      const token = generateAccessToken(id, 'user');

      return res.send({status: 'ok', success: true, message: 'Пользователь успешно зарегистрирован!', data: {token}});
    } catch (e) {
      console.log(e)
      res.status(400).json({success: false, message: 'Registration error'})
    }
  }

  async login(req, res) {
    try {
      const {username, password} = req.body;
      const [[user]] = await mysql.query(`SELECT * from users WHERE username='${username}'`);

      if (!user) {
        return res.send({
          status: 'error',
          success: false,
          message: 'Пользователь с таким именем не найден!'
        });
      }
      const validPassword = bcrypt.compareSync(password, user.hash_password);
      if (!validPassword) {
        return res.send({
          status: 'error',
          success: false,
          message: 'Введен неверный пароль!'
        });
      }
      const token = generateAccessToken(user.id, user.role)
      return res.send({
        status: 'ok',
        success: true,
        data: {...user, token}
      });
    } catch (e) {
      console.log(e)
      res.status(400).json({success: false, message: 'Ошибка входа!'})
    }
  }
}

module.exports = new AuthController();