import { useState } from 'react';
import { authService } from '../services/api';
import { authStorage } from '../services/auth.js';

function LoginPage({ onLoginSuccess }) {
    // Estado local del formulario
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
            onLoginSuccess(); // Le avisamos al padre que el login fue exitoso
        } catch {
            setError('Usuario o contraseña incorrectos');
        } finally {
            setLoading(false);
        }

    };
    return (
        <div className="row justify-content-center">
            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h4 className="card-title text-center mb-4">Acceso Admin</h4>
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
                            {error && <div className="alert alert-danger">{error}</div>}
                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading ? 'Entrando...' : 'Entrar'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;
