import React, { useState } from 'react';
import api from '../api';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                await api.post('/auth/login', { email, password });
            } else {
                await api.post('/auth/signup', { email, password, name });
            }
            window.location.reload();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Authentication failed');
        }
    };

    return (
        <div>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
            </button>
        </div>
    );
};

export default AuthPage; 