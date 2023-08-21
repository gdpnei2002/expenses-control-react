import React, { useState } from 'react';
import AuthService from '../../services/AuthService';
import axios from 'axios';

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const userEmail = email;
    const url = `https://api.airtable.com/v0/appafi3FiS8TEtgKo/User`;
  
    const data = {
      fields: {
        name: name,
        email: userEmail,
      },
    };
  
    const config = {
      headers: {
        Authorization: 'Bearer patfdqTNurL5Vrttj.e0494d984b5b6f4b7a57222e6b926735f47fd7644c4db400d9805a6b36451077',
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await axios.post(url, data, config);
      console.log('Dados enviados com sucesso!', response);
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>name:</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
