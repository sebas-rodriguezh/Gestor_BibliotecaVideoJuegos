import { useEffect, useState } from 'react';
import { usuarioService } from '../services/api';

const PerfilPage = () => {
    const [perfil, setPerfil] = useState({ username: '', email: '', nombreCompleto: '' });
    const [loading, setLoading]   = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje]   = useState('');
    const [error, setError]       = useState('');

    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                const datos = await usuarioService.getMe();
                setPerfil(datos);
            } catch (err) {
                setError('No se pudo cargar el perfil.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        obtenerPerfil();
    }, []);

    const handleChange = (e) => {
        setPerfil({ ...perfil, [e.target.name]: e.target.value });
    };

    const handleGuardar = async () => {
        setGuardando(true);
        setMensaje('');
        setError('');
        try {
            const actualizado = await usuarioService.updateMe({
                nombreCompleto: perfil.nombreCompleto,
                email: perfil.email,
            });
            setPerfil(actualizado);
            setMensaje('Perfil actualizado correctamente.');
        } catch (err) {
            setError(err.message || 'Error al guardar los cambios.');
        } finally {
            setGuardando(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status" />
                <p className="mt-2">Cargando perfil...</p>
            </div>
        );
    }

    return (
        <>
            <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Mi Perfil</h2>

            <div className="card shadow-sm" style={{ maxWidth: '500px', border: 'none' }}>
                <div className="card-body">

                    {mensaje && (
                        <div className="alert alert-success py-2" role="alert">
                            {mensaje}
                        </div>
                    )}
                    {error && (
                        <div className="alert alert-danger py-2" role="alert">
                            {error}
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="form-label fw-bold">Usuario (solo lectura)</label>
                        <input
                            className="form-control bg-light"
                            value={perfil.username || ''}
                            readOnly
                            disabled
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Nombre completo</label>
                        <input
                            className="form-control"
                            name="nombreCompleto"
                            value={perfil.nombreCompleto || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Correo electrónico</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            value={perfil.email || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        className="btn btn-primary w-100 mt-2"
                        onClick={handleGuardar}
                        disabled={guardando}
                    >
                        {guardando ? 'Guardando...' : 'Guardar cambios'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default PerfilPage;