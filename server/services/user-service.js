class UserService {
  async assignRole(user_id, role) {
    try {
      await mysql.query(`
        UPDATE users 
        SET role = '${role}'
        WHERE id = '${user_id}'
      `);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getUser(user_id) {
    try {
      const [[user]] = await mysql.query(`SELECT * from users WHERE id='${user_id}'`);
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = new UserService();