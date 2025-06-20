import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from './firebase';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import './App.css';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return <div>{user ? <HomePage /> : <AuthPage />}</div>;
};

export default App;
