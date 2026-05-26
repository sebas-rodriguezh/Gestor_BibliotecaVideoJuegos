import { useEffect, useState } from 'react';
import { usuarioService } from '../services/api';

const PerfilPage = () => {
    const [perfil, setPerfil] = useState({ username: '', email: '', nombreCompleto: '' });

    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                const datosUsuario = await usuarioService.getMe();
                setPerfil(datosUsuario);
            } catch (error) {
                console.error("Error al obtener perfil", error.message);
            }
        };
        obtenerPerfil();
    }, []);

    return (
        <>
            <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>👤 Mi Perfil</h2>

            <div className="card shadow-sm" style={{ maxWidth: '500px', border: 'none' }}>
                <div className="card-body">
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                        <div>
                            <label className="form-label fw-bold">Usuario (Solo lectura)</label>
                            <input className="form-control bg-light" value={perfil.username || ''} readOnly disabled />
                        </div>

                        <div>
                            <label className="form-label fw-bold">Nombre Completo</label>
                            <input
                                className="form-control"
                                value={perfil.nombreCompleto || ''}
                                onChange={(e) => setPerfil({...perfil, nombreCompleto: e.target.value})}
                            />
                        </div>

                        <div>
                            <label className="form-label fw-bold">Correo Electrónico</label>
                            <input
                                className="form-control"
                                type="email"
                                value={perfil.email || ''}
                                onChange={(e) => setPerfil({...perfil, email: e.target.value})}
                            />
                        </div>

                        <button
                            type="button"
                            className="btn btn-primary mt-2"
                            onClick={() => alert("Función de actualización pendiente según la rúbrica")}
                        >
                            Guardar Cambios
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PerfilPage;