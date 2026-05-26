import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PerfilPage from './pages/PerfilPage';
import PageXXX from './pages/PageXXX';
import PageYYY from './pages/PageYYY';

import { authStorage } from './services/auth';

const PrivateRoute = ({ children }) => {
    const estaAutenticado = authStorage.isAuthenticated();
    return estaAutenticado ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                {/* Rutas Públicas */}
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Rutas Privadas (Envueltas en PrivateRoute) */}
                <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                <Route path="/perfil" element={<PrivateRoute><PerfilPage /></PrivateRoute>} />
                <Route path="/xxx" element={<PrivateRoute><PageXXX /></PrivateRoute>} />
                <Route path="/yyy" element={<PrivateRoute><PageYYY /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;