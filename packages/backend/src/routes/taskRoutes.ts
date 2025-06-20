import { Router } from 'express';

import {
    getTasks,
    getMyTasks,
    getSharedTasks,
    createTask,
    shareTask,
} from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getTasks);
router.get('/my-tasks', authMiddleware, getMyTasks);
router.get('/shared-tasks', authMiddleware, getSharedTasks);
router.post('/', authMiddleware, createTask);
router.post('/share', authMiddleware, shareTask);

export default router; 