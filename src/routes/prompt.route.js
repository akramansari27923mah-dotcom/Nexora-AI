import express from 'express';
import promptController from '../controllers/prompt.controller.js';
import middleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/',middleware, promptController.sendPrompt)
router.get('/', middleware, promptController.getData)

export default router