import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import AuthService from '../../services/AuthService';
import './header.css';

interface HeaderProps {
  authService: AuthService;
}

function Header({ authService }: HeaderProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setUserEmail(user.email);
      console.log( "dentro  do if " + user.email);
    }
    console.log( "fora do if "+ userEmail);
    
  }, [authService]);

  const logout = async () => {
    setIsLoggingOut(true);
    await authService.logout();
    setIsLoggingOut(false);
    navigate('/');
  };

  return (
    <header>
      <div className="user-info">
        {userEmail !== null ? (
          <>
            <p>Usuário logado: {userEmail}</p>
            <button className="clear" onClick={logout}>
              Sair
            </button>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
      {isLoggingOut && <Loading />}
    </header>
  );
}

export default Header;
