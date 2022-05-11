import express from 'express';
import * as usersController from '../controllers/users';

const router = express.Router();

router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);

export default router;
