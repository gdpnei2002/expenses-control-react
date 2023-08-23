import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/auth/AuthContext';
import AuthService from '../../services/AuthService';
import './HomePage.css';
import axios from 'axios';
import Header from '../../components/header';

function HomePage() {
    const { authService }: { authService: AuthService } = useAuthContext();
    const [userData, setUserData] = useState<{ name: string; email: string; idHash: string }[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        const url = 'https://api.airtable.com/v0/appafi3FiS8TEtgKo/User';
        const headers = {
            Authorization: 'Bearer patfdqTNurL5Vrttj.e0494d984b5b6f4b7a57222e6b926735f47fd7644c4db400d9805a6b36451077',
            'Content-Type': 'application/json',
        };
    
        axios.get(url, { headers })
            .then((response) => {
                const records = response.data.records;
                const formattedData = records.map((user: any) => ({
                    name: user.fields.name,
                    email: user.fields.email,
                    idHash: user.fields.idHash,
                }));
                setUserData(formattedData);
            })
            .catch((error) => {
                console.error('Erro ao buscar dados:', error);
            });
    }

    return (
        <>
            <div>
                <h1>Lista de Usuários</h1>
                <ul>
                    {userData.map((user, index) => (
                        <li key={index}>
                            <strong>name:</strong> {user.name} <strong>Email:</strong> {user.email} <strong>idHash</strong> {user.idHash}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default HomePage;
