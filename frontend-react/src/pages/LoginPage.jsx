import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { authStorage } from '../services/auth.js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function LoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await authService.login(username, password);
            authStorage.setToken(response.token);
            navigate('/dashboard');
        } catch {
            setError('Usuario o contraseña incorrectos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />

            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: '#f4f6f8' }}>
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title text-center mb-4">Iniciar sesión</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Usuario</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <div className="alert alert-danger py-2">{error}</div>}
                                <button type="submit" className="btn btn-primary w-100 mb-2" disabled={loading}>
                                    {loading ? 'Entrando...' : 'Entrar'}
                                </button>
                            </form>
                            <p className="text-center text-muted mb-0" style={{ fontSize: '0.875rem' }}>
                                ¿No tienes cuenta?{' '}
                                <a href="/register">Regístrate</a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default LoginPage;