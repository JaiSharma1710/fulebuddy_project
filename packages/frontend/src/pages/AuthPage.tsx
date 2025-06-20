import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';
import api from '../api';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            await signInWithEmailAndPassword(auth, email, password);
        } else {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await api.post('/users', {
                uid: userCredential.user.uid,
                email,
                name,
            });
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
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
            </button>
        </div>
    );
};

export default AuthPage; 