const userService = require('../services/user-service');

class UserController {
  async getUser(req, res, next) {
    try {
      const user = await userService.getUser(req.user_id);

      if (user) {
        return res.send({
          status: 'ok',
          success: true,
          data: user
        });
      } else {
        return res.send({
          status: 'ok',
          success: false,
          message: 'Пользователь не найден'
        });
      }
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const { per_page=10, page=1 } = req.query;
      const offset = (page - 1) * per_page;
      const [users] = await mysql.query(`SELECT * FROM users LIMIT ${per_page} OFFSET ${offset}`);
      const [[{ total }]] = await mysql.query(`SELECT COUNT(*) AS total FROM users`);

      if (users) {
        return res.send({
          status: 'ok',
          success: true,
          data: {total, per_page, page, users}
        });
      } else {
        return res.send({
          status: 'ok',
          success: false,
          message: 'Пользователи не найдены'
        });
      }
    } catch (e) {
      next(e);
    }
  }

  async assignRole(req, res, next) {
    try {
      const userRole = req.role;
      const { user_id, role } = req.body;

      if (req.user_id === user_id) {
        return res.send({ success: false, status: 'error', message: 'Вы не можете изменить себе роль!' });
      }

      if (userRole !== 'admin') {
        return res.send({ success: false, status: 'error', message: 'У вас нет прав на это действие!' });
      }

      await userService.assignRole(user_id, role);
      return res.send({ status: 'ok', success: true, message: 'Роль успешно назначена пользователю!' });
    } catch (e) {
      next(e);
    }
  }

  async uploadImage(req, res, next) {
    try {
      const { avatar } = req.files;

      // If no image submitted, exit
      if (!image) return res.sendStatus(400);

      // Move the uploaded image to our public folder
      image.mv(__dirname + '/public/' + image.name);

      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { user_id } = req.query;

      await userService.deleteUser(user_id);
      return res.send({ status: 'ok', success: true, message: 'Пользователь удален!' });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();