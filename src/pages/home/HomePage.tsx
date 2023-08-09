import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import { useAuthContext } from '../../contexts/auth/AuthContext';
import AuthService from '../../services/AuthService';
import './HomePage.css';
import axios from 'axios';

function HomePage() {
    const { authService }: { authService: AuthService } = useAuthContext();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();
    const [userData, setUserData] = useState<{ name: string; email: string }[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get(
            'https://api.airtable.com/v0/appafi3FiS8TEtgKo/User',
            {
                headers: {
                    Authorization: 'Bearer patfdqTNurL5Vrttj.e0494d984b5b6f4b7a57222e6b926735f47fd7644c4db400d9805a6b36451077',
                    'Content-Type': 'application/json',
                },
            }
        );

        const records = response.data.records;

        const formattedData = records.map((user: any) => ({
            name: user.fields.name,
            email: user.fields.email,
        }));
        setUserData(formattedData);
    };

    const logout = () => {
        setIsLoggingOut(true);
        authService.logout().then(() => {
            setIsLoggingOut(false);
            navigate('/');
        });
    }

    return (
        <>
            <header>
                <button className='clear' onClick={logout}>Sair</button>
            </header>
            {isLoggingOut && <Loading />}

            <div>
                <h1>Lista de Usuários</h1>
                <ul>
                    {userData.map((user, index) => (
                        <li key={index}>
                            <strong>name:</strong> {user.name} <strong>Email:</strong> {user.email}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default HomePage;
