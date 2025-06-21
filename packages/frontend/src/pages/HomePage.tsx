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

    const handleDelete = async (taskId: string) => {
        await api.delete(`/tasks/${taskId}`);
        setTasks(tasks.filter(task => task._id !== taskId));
    };

    return (
        <div className="app-container" style={{ minHeight: '100vh', position: 'relative' }}>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <div className="card" style={{ maxWidth: 600, width: '100%' }}>
                <h1 style={{ textAlign: 'center' }}>Tasks</h1>
                <CreateTask onTaskCreated={(task) => setTasks(prev => [task, ...prev])} />
                <div>
                    <select className="filter-select" onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All Tasks</option>
                        <option value="my">My Tasks</option>
                        <option value="shared">Shared Tasks</option>
                    </select>
                </div>
                <ul className="task-list">
                    {tasks.map((task) => (
                        <li className="task-item" key={task._id}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p style={{ color: '#888', fontSize: '0.97rem' }}>Created by: {task.createdBy.name}</p>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                <button
                                    style={{ marginTop: '0.5rem' }}
                                    onClick={() => {
                                        setShareTaskId(task._id);
                                        setShowSharePopup(true);
                                    }}
                                >
                                    Share
                                </button>
                                <button
                                    style={{ marginTop: '0.5rem', background: '#fff', color: '#e74c3c', border: '1px solid #e74c3c' }}
                                    onClick={() => handleDelete(task._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {showSharePopup && (
                <div className="modal">
                    <div className="modal-content" style={{ position: 'relative' }}>
                        <button
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                color: '#888',
                                cursor: 'pointer',
                            }}
                            onClick={() => setShowSharePopup(false)}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <h2>Share Task</h2>
                        <input
                            type="email"
                            placeholder="Email to share with"
                            value={shareEmail}
                            onChange={(e) => setShareEmail(e.target.value)}
                        />
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button onClick={handleShare}>Share</button>
                            <button style={{ background: '#fff', color: '#fda085', border: '1px solid #fda085' }} onClick={() => setShowSharePopup(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage; 