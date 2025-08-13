import UserMySQL from '../models/user.mysql.js';

export const createUser = async (userData) => {
    try {
        const user = await UserMySQL.create(userData);
        return user;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
}

export const getUserByEmail = async (email) => {
    try {
        const user = await UserMySQL.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const userData = user.get({ plain: true });
        userData.password = undefined; // Exclude password from response
        return userData;
    } catch (error) {
        throw new Error(`Error fetching user by email: ${error.message}`);
    }
}

export const getUserById = async (id) => {
    try {
        const user = await UserMySQL.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        const userData = user.get({ plain: true });
        userData.password = undefined; // Exclude password from response
        return userData;
    } catch (error) {
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
}
export const updateUser = async (id, updateData) => {
    try {
        const [updatedRows, [updatedUser]] = await UserMySQL.update(updateData, {
            where: { id },
            returning: true,
            individualHooks: true // Ensure hooks are called for validations
        });
        if (updatedRows === 0) {
            throw new Error('User not found or no changes made');
        }
        return updatedUser.get({ plain: true });
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
}
export const deleteUser = async (id) => {
    try {
        const user = await UserMySQL.destroy({ where: { id } });
        if (user === 0) {
            throw new Error('User not found');
        }
        return { message: 'User deleted successfully' };
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
}
export const getAllUsers = async (filter = {}, options = {}) => {
    try {
        const { limit = 10, offset = 0 } = options;
        const users = await UserMySQL.findAll({
            where: filter,
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });
        return users.map(user => user.get({ plain: true }));
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