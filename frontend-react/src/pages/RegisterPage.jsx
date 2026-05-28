import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '', password: '', email: '', nombreCompleto: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await authService.register(formData);
            navigate('/login');
        } catch (err) {
            setError('Error al registrar: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />

            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: '#f4f6f8' }}>
                <div style={{ width: '100%', maxWidth: '420px' }}>
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title text-center mb-4">Crear cuenta</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre completo</label>
                                    <input
                                        name="nombreCompleto"
                                        className="form-control"
                                        placeholder="Tu nombre"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Usuario</label>
                                    <input
                                        name="username"
                                        className="form-control"
                                        placeholder="Nombre de usuario"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Correo electrónico</label>
                                    <input
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        placeholder="correo@ejemplo.com"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contraseña</label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {error && <div className="alert alert-danger py-2">{error}</div>}
                                <button type="submit" className="btn btn-primary w-100 mb-2" disabled={loading}>
                                    {loading ? 'Registrando...' : 'Crear cuenta'}
                                </button>
                            </form>
                            <p className="text-center text-muted mb-0" style={{ fontSize: '0.875rem' }}>
                                ¿Ya tienes cuenta?{' '}
                                <a href="/login">Inicia sesión</a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RegisterPage;