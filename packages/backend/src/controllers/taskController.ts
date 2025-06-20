import { Request, Response } from 'express';
import { Task } from '../models/Task';
import { User } from '../models/User';

// Get all tasks for the logged-in user (created by them or shared with them)
export const getTasks = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ uid: (req as any).user.uid });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const tasks = await Task.find({
            $or: [{ createdBy: user._id }, { sharedWith: user._id }],
        }).populate('createdBy', 'name email');
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get all tasks created by the logged-in user
export const getMyTasks = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ uid: (req as any).user.uid });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const tasks = await Task.find({ createdBy: user._id }).populate('createdBy', 'name email');
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get all tasks shared with the logged-in user
export const getSharedTasks = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ uid: (req as any).user.uid });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const tasks = await Task.find({ sharedWith: user._id }).populate('createdBy', 'name email');
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Create a new task
export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const user = await User.findOne({ uid: (req as any).user.uid });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const task = new Task({
            title,
            description,
            createdBy: user._id,
        });
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Share a task with another user
export const shareTask = async (req: Request, res: Response) => {
    try {
        const { taskId, shareWithEmail } = req.body;
        const shareWithUser = await User.findOne({ email: shareWithEmail });
        if (!shareWithUser) {
            return res.status(404).send({ message: 'User to share with not found' });
        }
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        task.sharedWith.push(shareWithUser._id);
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
}; 