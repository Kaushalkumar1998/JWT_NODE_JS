import express from 'express';
import userController from '../controllers/user.controller';
import { ValidateBody } from '../middlewares/validateBody';
import userSchema from '../validators/user.validators';

const router = express.Router();

router.post('/users', ValidateBody(userSchema), userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', ValidateBody(userSchema), userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/users', userController.getAllUsers);

export default router;