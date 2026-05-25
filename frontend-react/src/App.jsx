import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import { authStorage } from './services/auth.js';

function App() {
    // El estado de autenticación vive aquí arriba, en el "padre"
    // porque tanto Navbar como las páginas necesitan saberlo
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => authStorage.isAuthenticated()
    );

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        authStorage.removeToken();
        setIsAuthenticated(false);
    };

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

            <div className="container mt-4">
                {isAuthenticated
                    ? <DashboardPage />
                    : <LoginPage onLoginSuccess={handleLoginSuccess} />
                }
            </div>
        </>
    );
}

export default App;