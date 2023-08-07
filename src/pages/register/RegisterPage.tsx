import React, { useState } from 'react';
import AuthService from '../../services/AuthService';

const authService = new AuthService();

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    authService.register(email, password)
      .then(() => {
      })
      .catch(error => {
      });
  };

  return (
    <div>
      <h1>Register Page</h1>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterPage;
