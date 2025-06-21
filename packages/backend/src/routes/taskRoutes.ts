import { Router } from 'express';

import {
    getTasks,
    getMyTasks,
    getSharedTasks,
    createTask,
    shareTask,
    deleteTask,
} from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getTasks);
router.get('/my-tasks', authMiddleware, getMyTasks);
router.get('/shared-tasks', authMiddleware, getSharedTasks);
router.post('/', authMiddleware, createTask);
router.post('/share', authMiddleware, shareTask);
router.delete('/:id', authMiddleware, deleteTask);

export default router; 