import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WelcomePage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />

            <main style={{ flex: 1, padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#ffffff' }}>
                <h1 style={{ marginBottom: '1rem' }}>Bienvenido al Gestor de Videojuegos</h1>
                <p style={{ color: '#666', marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
                    Tu catálogo personal listo para gestionar.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/login" className="btn btn-primary">
                        Iniciar sesión
                    </Link>
                    <Link to="/register" className="btn btn-outline-secondary">
                        Crear cuenta
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default WelcomePage;