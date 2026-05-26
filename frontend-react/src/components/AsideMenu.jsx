import { Link, useNavigate } from 'react-router-dom';
import { authStorage } from '../services/auth';

const AsideMenu = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authStorage.removeToken();
        navigate('/login');
    };

    return (
        <aside style={{ width: '200px', background: '#f4f4f4', padding: '1rem', minHeight: '100vh' }}>
            <h3>Menú Privado</h3>
            <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/perfil">Editar Perfil</Link></li>
                <li><Link to="/xxx">Página XXX</Link></li>
                <li><Link to="/yyy">Página YYY</Link></li>
                <li>
                    <button onClick={handleLogout} style={{ background: 'red', color: 'white', marginTop: '20px', border: 'none', padding: '10px', cursor: 'pointer' }}>
                        Logout
                    </button>
                </li>
            </ul>
        </aside>
    );
};

export default AsideMenu;