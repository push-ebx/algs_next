class UserService {
  async assignRole(user_id, role) {
    try {
      await mysql.query(`
        UPDATE users 
        SET role = '${role}'
        WHERE user_id = '${user_id}'
      `);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = new UserService();