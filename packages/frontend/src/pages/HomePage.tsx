import React, { useState, useEffect } from 'react';
import api from '../api';
import CreateTask from '../components/CreateTask';

interface Task {
    _id: string;
    title: string;
    description: string;
    createdBy: {
        name: string;
        email: string;
    };
}

const HomePage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState('all');
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [shareTaskId, setShareTaskId] = useState('');
    const [shareEmail, setShareEmail] = useState('');
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        api.get('/auth/me')
            .then(res => setUser(res.data))
            .catch(() => window.location.reload());
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            let url = '/tasks';
            if (filter === 'my') {
                url = '/tasks/my-tasks';
            } else if (filter === 'shared') {
                url = '/tasks/shared-tasks';
            }
            const response = await api.get(url);
            setTasks(response.data);
        };
        fetchTasks();
    }, [filter]);

    const handleShare = async () => {
        await api.post('/tasks/share', {
            taskId: shareTaskId,
            shareWithEmail: shareEmail,
        });
        setShowSharePopup(false);
        setShareEmail('');
    };

    const handleLogout = async () => {
        await api.post('/auth/logout');
        window.location.reload();
    };

    return (
        <div>
            <h1>Tasks</h1>
            <button onClick={handleLogout}>Logout</button>
            <CreateTask />
            <div>
                <select onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All Tasks</option>
                    <option value="my">My Tasks</option>
                    <option value="shared">Shared Tasks</option>
                </select>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Created by: {task.createdBy.name}</p>
                        <button
                            onClick={() => {
                                setShareTaskId(task._id);
                                setShowSharePopup(true);
                            }}
                        >
                            Share
                        </button>
                    </li>
                ))}
            </ul>
            {showSharePopup && (
                <div>
                    <h2>Share Task</h2>
                    <input
                        type="email"
                        placeholder="Email to share with"
                        value={shareEmail}
                        onChange={(e) => setShareEmail(e.target.value)}
                    />
                    <button onClick={handleShare}>Share</button>
                    <button onClick={() => setShowSharePopup(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default HomePage; 