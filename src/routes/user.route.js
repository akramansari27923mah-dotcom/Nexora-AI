import express from 'express';
import authController from '../controllers/auth.controller.js';
import middleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout',middleware, authController.logout)
router.get('/get-user', middleware, authController.getUser)

export default router