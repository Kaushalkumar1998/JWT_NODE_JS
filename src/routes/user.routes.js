import express from 'express';
import userController from '../controllers/user.controller.js';
import ValidateBody from '../middlewares/validate.middleware.js';
import userSchema from '../validators/user.validators.js';

const router = express.Router();

router.post('/users', ValidateBody(userSchema), userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', ValidateBody(userSchema), userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/users', userController.getAllUsers);

export default router;