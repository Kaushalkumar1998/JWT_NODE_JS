import userMongoRepo from '../repositories/userMongoRepo.js';


const createUser = async (userData) => {
    try {
        const existingUser = await userMongoRepo.getUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        return await userMongoRepo.createUser(userData);
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await userMongoRepo.getUserByEmail(email);
        return user;
    } catch (error) {
        throw new Error(`Error fetching user by email: ${error.message}`);
    }
}

const getUserById = async (id) => {
    try {
        const user = await userMongoRepo.getUserById(id);
        return user;
    } catch (error) {
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
}
const updateUser = async (id, updateData) => {
    try {
        const user = await userMongoRepo.updateUser(id, updateData);
        return user;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
}

const deleteUser = async (id) => {
    try {
        const user = await userMongoRepo.deleteUser(id);
        return user;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
}
const getAllUsers = async (filter = {}, options = {}) => {
    try {
        const users = await userMongoRepo.getAllUsers(filter, options);
        return users;
    } catch (error) {
        throw new Error(`Error fetching all users: ${error.message}`);
    }
}

export default {
    createUser,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers
}   