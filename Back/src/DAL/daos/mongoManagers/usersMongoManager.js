import { usersModel } from "../../models/users.model.js";

export default class UsersMongoManager {
  async createUser(user) {
    try {
      const newUser = await usersModel.create(user);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async findByEmail(email) {
    try {
      const newUser = await usersModel.find(email);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(userId) {
    try {
      const userDeleted = await usersModel.findByIdAndDelete(userId);
      return userDeleted;
    } catch (error) {
      console.log(error);
    }
  }
}
