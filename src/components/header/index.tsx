import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import { useAuthContext } from '../../contexts/auth/AuthContext';
import AuthService from '../../services/AuthService';
import './header.css';
import axios from 'axios';

function Header() {
    const { authService }: { authService: AuthService } = useAuthContext();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    

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
        </>
    );
}

export default Header;
