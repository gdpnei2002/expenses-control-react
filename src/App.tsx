import './App.css';
import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import RegisterPage from './pages/register/RegisterPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Loading from './components/loading/Loading';
import { useAuthContext } from './contexts/auth/AuthContext';
import CreateProduct from './pages/admin/createProduct';
import AppointmentForm from './pages/agendamento/Scheduling';

function App() {

  const { isLoadingLoggedUser, user } = useAuthContext();

  return (
    <>
      {
        !isLoadingLoggedUser &&
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                !user ? <LoginPage /> : <Navigate to={'/home'} />
              } />
            <Route
              path='/register'
              element={
                !user ? <RegisterPage /> : <Navigate to={'/home'} />
              } />
            <Route
              path='/home'
              element={
                user ? <HomePage /> : <Navigate to={'/'} />
              } />
            <Route
              path='/createProduct'
              element={
                user ? <CreateProduct /> : <Navigate to={'/'} />
              } />
            <Route
              path='/agendamento'
              element={
                user ? <AppointmentForm /> : <Navigate to={'/'} />
              } />
          </Routes>
        </BrowserRouter>
      }
      { isLoadingLoggedUser && <Loading /> }
    </>
  )
}

export default App;
