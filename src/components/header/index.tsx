import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import AuthService from "../../services/AuthService";
import "./header.css";
import axios from "axios";

interface HeaderProps {
  authService: AuthService;
}

function Header({ authService }: HeaderProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{ name: string; email: string; idHash: string }[]>([]);
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
      console.log("dentro do if " + user.email);
    }
  }, [user]);

  useEffect(() => {
    if (userEmail) {
      fetchData();
    }
  }, [userEmail]);

  const logout = async () => {
    setIsLoggingOut(true);
    await authService.logout();
    setIsLoggingOut(false);
    navigate("/");
  };

  function fetchData() {
    if (userEmail) {
      const url = `https://api.airtable.com/v0/appafi3FiS8TEtgKo/User?filterByFormula={email}="${userEmail}"`;

      const headers = {
        Authorization:
          "Bearer patfdqTNurL5Vrttj.e0494d984b5b6f4b7a57222e6b926735f47fd7644c4db400d9805a6b36451077",
        "Content-Type": "application/json",
      };

      axios
        .get(url, { headers })
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
          console.error("Erro ao buscar dados:", error);
        });
    }
  }

  return (
    <header>
      <div className="user-info">
        {userEmail !== null ? (
          <>
            {userData.map((user, index) => (
              <p key={index}>OLÁ {user.name}
                <button className="clear" onClick={logout}>
                  Sair
                </button>
              </p>
            ))}
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
