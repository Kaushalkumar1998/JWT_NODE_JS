import UserMongo from '../models/user.mongo.js';

const createUser = async (userData) => {
    try {
        const user = new UserMongo(userData);
        await user.save();
        return user;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await UserMongo.findOne({ email }).lean();
        if (!user) {
            throw new Error('User not found');
        }
        user.password = undefined;
        return user;
    } catch (error) {
        throw new Error(`Error fetching user by email: ${error.message}`);
    }
}

const getUserById = async (id) => {
    try {
        const user = await UserMongo.findById(id).lean();
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
}

const updateUser = async (id, updateData) => {
    try {
        const user = await UserMongo.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).lean();
        return user;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
}

const deleteUser = async (id) => {
    try {
        const user = await UserMongo.findByIdAndDelete(id);
        return user;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
}
const getAllUsers = async (filter = {}, options = {}) => {
    try {
        const users = await UserMongo.find(filter).skip(options.skip || 0).limit(options.limit || 10).lean();
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
};
