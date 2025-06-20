import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import api from './api';
import './App.css';

const App: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/auth/me')
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{user ? <HomePage /> : <AuthPage />}</div>;
};

export default App;
