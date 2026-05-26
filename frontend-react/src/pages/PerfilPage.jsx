import { useEffect, useState } from 'react';
import AsideMenu from '../components/AsideMenu';
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
        <div style={{ display: 'flex' }}>
            <AsideMenu />

            <main style={{ padding: '2rem', flex: 1 }}>
                <h2>Editar Perfil</h2>
                <form style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
                    <label>Usuario (Solo lectura)</label>
                    <input value={perfil.username} readOnly disabled />

                    <label>Nombre Completo</label>
                    <input value={perfil.nombreCompleto} onChange={(e) => setPerfil({...perfil, nombreCompleto: e.target.value})} />

                    <label>Correo Electrónico</label>
                    <input value={perfil.email} onChange={(e) => setPerfil({...perfil, email: e.target.value})} />

                    <button type="button" onClick={() => alert("Función de actualización pendiente")}>
                        Guardar Cambios
                    </button>
                </form>
            </main>
        </div>
    );
};

export default PerfilPage;