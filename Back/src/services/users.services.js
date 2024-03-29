import UsersMongoManager from '../dao/mongoManagers/usersMongoManager.js'
import { hashData } from "../utils/utils.js";

const usersManager = new UsersMongoManager()

export async function createUser(user) {
    try {
        const hashPassword = await hashData(user.password)
        const newUser = await usersManager.createUser({...user, password: hashPassword})
        return newUser
    } catch (error) {
        return error;
    }
}

export async function findByEmail(email) {
    try {
        const user = await usersManager.findByEmail(email)
        return user
    } catch (error) {
        return error;
    }
}

export async function deleteUser(userId) {
    try {
        const userDeleted = await usersManager.deleteUser(userId)
        return userDeleted
    } catch (error) {
        return error;
    }
}

export async function getAllUsers(userId) {
    try {
        const users = await usersManager.findAllUsers()
        return users
    } catch (error) {
        return error;
    }
}