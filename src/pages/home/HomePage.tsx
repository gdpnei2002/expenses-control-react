import { useEffect, useState } from 'react';
import './HomePage.css';
import axios from 'axios';

function HomePage() {
    const [userData, setUserData] = useState<{ id: number; name: string; email: string; idHash: string }[]>([]);

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
                    id: user.fields.id,
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
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>idHash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.idHash}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default HomePage;
