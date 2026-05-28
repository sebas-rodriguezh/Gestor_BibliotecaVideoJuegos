import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authStorage } from '../services/auth';

const navLinks = [
    { to: '/dashboard', label: 'Catálogo' },
    { to: '/perfil', label: 'Mi perfil' },
    { to: '/xxx', label: 'Página X' },
    { to: '/yyy',  label: 'Página Y' },
];

const AsideMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        authStorage.removeToken();
        navigate('/');
    };

    return (
        <aside style={{
            width: '220px',
            minWidth: '220px',
            background: '#212529',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem 1rem',
        }}>
            <p style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#6c757d',
                margin: '0 0 1rem 0.5rem'
            }}>
                Menú
            </p>

            <nav style={{ flex: 1 }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {navLinks.map(({ to, label }) => {
                        const active = location.pathname === to;
                        return (
                            <li key={to}>
                                <Link
                                    to={to}
                                    style={{
                                        display: 'block',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        color: active ? '#ffffff' : '#adb5bd',
                                        background: active ? '#343a40' : 'transparent',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        transition: 'background 0.15s, color 0.15s',
                                    }}
                                >
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <button
                onClick={handleLogout}
                className="btn btn-outline-secondary btn-sm w-100 mt-3"
                style={{ fontSize: '0.85rem' }}
            >
                Cerrar sesión
            </button>
        </aside>
    );
};

export default AsideMenu;