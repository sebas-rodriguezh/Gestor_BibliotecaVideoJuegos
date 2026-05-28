import { Link, useNavigate } from 'react-router-dom';
import { authStorage } from '../services/auth';

function Navbar() {
    const navigate = useNavigate();
    const isAuthenticated = authStorage.isAuthenticated();

    const handleLogout = () => {
        authStorage.removeToken();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-dark bg-dark px-4">
            <Link to="/" className="navbar-brand mb-0 h1" style={{ fontSize: '1.1rem' }}>
                Gestor de Videojuegos
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard" className="text-light text-decoration-none" style={{ fontSize: '0.9rem' }}>
                            Catálogo
                        </Link>
                        <Link to="/xxx" className="text-light text-decoration-none" style={{ fontSize: '0.9rem' }}>
                            Página X
                        </Link>
                        <Link to="/yyy" className="text-light text-decoration-none" style={{ fontSize: '0.9rem' }}>
                            Página Y
                        </Link>
                        <button
                            className="btn btn-outline-light btn-sm"
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/" className="text-light text-decoration-none" style={{ fontSize: '0.9rem' }}>
                            Inicio
                        </Link>
                        <Link to="/login" className="text-light text-decoration-none" style={{ fontSize: '0.9rem' }}>
                            Iniciar sesión
                        </Link>
                        <Link to="/register" className="btn btn-outline-light btn-sm">
                            Registrarse
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;