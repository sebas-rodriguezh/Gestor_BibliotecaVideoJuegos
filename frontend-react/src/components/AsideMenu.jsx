import { Link, useNavigate } from 'react-router-dom';
import { authStorage } from '../services/auth';

const AsideMenu = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authStorage.removeToken();
        navigate('/login');
    };

    return (
        <aside style={{
            width: '260px',
            background: '#212529', // Gris oscuro de Bootstrap para un acabado limpio
            color: '#ffffff',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '3px 0 10px rgba(0,0,0,0.1)'
        }}>
            <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '2rem', borderBottom: '1px solid #495057', paddingBottom: '0.5rem', color: '#fff' }}>
                    🎮 Menú Principal
                </h4>
                <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <li><Link to="/dashboard" style={{ color: '#adb5bd', textDecoration: 'none', fontWeight: '500', display: 'block' }}>📊 Catálogo</Link></li>
                    <li><Link to="/perfil" style={{ color: '#adb5bd', textDecoration: 'none', fontWeight: '500', display: 'block' }}>👤 Mi Perfil</Link></li>
                    <li><Link to="/xxx" style={{ color: '#adb5bd', textDecoration: 'none', fontWeight: '500', display: 'block' }}>🔒 Opción XXX</Link></li>
                    <li><Link to="/yyy" style={{ color: '#adb5bd', textDecoration: 'none', fontWeight: '500', display: 'block' }}>🔒 Opción YYY</Link></li>
                </ul>
            </div>

            <button onClick={handleLogout} className="btn btn-danger w-100" style={{ fontWeight: 'bold' }}>
                Cerrar Sesión
            </button>
        </aside>
    );
};

export default AsideMenu;