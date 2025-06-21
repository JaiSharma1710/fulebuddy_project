import React, { useState } from 'react';
import api from '../api';

interface Task {
    _id: string;
    title: string;
    description: string;
    createdBy: {
        name: string;
        email: string;
    };
}

const CreateTask: React.FC<{ onTaskCreated: (task: Task) => void }> = ({ onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const res = await api.post('/tasks', { title, description });
            setTitle('');
            setDescription('');
            setSuccess('Task created!');
            onTaskCreated(res.data);
            setTimeout(() => setSuccess(''), 1200);
        } catch {
            setError('Failed to create task');
            setTimeout(() => setError(''), 1200);
        }
    };

    return (
        <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Create Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                />
                <button type="submit">Create</button>
            </form>
            {success && <div className="error" style={{ color: '#27ae60', background: '#eafaf1' }}>{success}</div>}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default CreateTask; 