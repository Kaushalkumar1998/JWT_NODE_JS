import userService from "../services/user.service";

const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = await userService.createUser(userData);
        return res.status(201).json({ status: 'success', data: user });
    } catch (error) {
        return res.status(400).json({ status: 'error', message: error.message });
    }
}

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        return res.status(200).json({ status: 'success', data: user });
    } catch (error) {
        return res.status(400).json({ status: 'error', message: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        return res.status(200).json({ status: 'success', data: user });
    } catch (error) {
        return res.status(400).json({ status: 'error', message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const user = await userService.updateUser(id, updateData);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        return res.status(200).json({ status: 'success', data: user });
    } catch (error) {
        return res.status(400).json({ status: 'error', message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.deleteUser(id);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        return res.status(200).json({ status: 'success', data: user });
    } catch (error) {
        return res.status(400).json({ status: 'error', message: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json({ status: 'success', data: users });
    } catch (error) {
        return res.status(400).json({ status: 'error', message: error.message });
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