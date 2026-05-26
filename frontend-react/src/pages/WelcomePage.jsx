import { Link } from 'react-router-dom';

const WelcomePage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Top Menu */}
            <header style={{ padding: '1rem', background: '#333', color: 'black', display: 'flex', justifyContent: 'space-between' }}>
                <h2>Gestor de Videojuegos</h2>
                <nav>
                    <Link to="/login" style={{ color: 'white', marginRight: '1rem' }}>Iniciar Sesión</Link>
                    <Link to="/register" style={{ color: 'white' }}>Registrarse</Link>
                </nav>
            </header>

            {/* Contenido Principal */}
            <main style={{ flex: 1, padding: '2rem', textAlign: 'center' }}>
                <h1>Bienvenido a la SPA de Videojuegos</h1>
                <p>Tu catálogo personal listo para gestionar.</p>
            </main>

            {/* Footer */}
            <footer style={{ padding: '1rem', background: '#333', color: 'white', textAlign: 'center' }}>
                <p>Proyecto Base para Examen</p>
            </footer>
        </div>
    );
};

export default WelcomePage;