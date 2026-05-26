import { Link } from 'react-router-dom';

const WelcomePage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <header style={{ padding: '1rem 2rem', background: '#333', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>Gestor de Videojuegos</h2>
                <nav>
                    <Link to="/login" style={{ color: 'white', marginRight: '1.5rem', textDecoration: 'none' }}>Iniciar Sesión</Link>
                    <Link to="/register" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Registrarse</Link>
                </nav>
            </header>

            <main style={{ flex: 1, padding: '3rem', textAlign: 'center', backgroundColor: '#fff' }}>
                <h1>Bienvenido a la SPA de Videojuegos</h1>
                <p style={{ color: '#666' }}>Tu catálogo personal listo para gestionar con rendimiento optimizado.</p>
            </main>

            <footer style={{ padding: '1rem', background: '#333', color: '#ccc', textAlign: 'center' }}>
                <p style={{ margin: 0 }}>Proyecto Base para Examen</p>
            </footer>
        </div>
    );
};

export default WelcomePage;