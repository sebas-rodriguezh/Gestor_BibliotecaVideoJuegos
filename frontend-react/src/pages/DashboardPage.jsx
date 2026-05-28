import { useState, useEffect } from 'react';
import { juegoService } from '../services/api';
import JuegoRow from '../components/JuegoRow';
import NuevoJuegoModal from '../components/NuevoJuegoModal';

function DashboardPage() {
    const [juegos, setJuegos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
        cargarJuegos();
    }, []);

    const cargarJuegos = async () => {
        try {
            setLoading(true);
            const data = await juegoService.getAll();
            setJuegos(data);
        } catch {
            setError('Error al cargar los juegos');
        } finally {
            setLoading(false);
        }
    };

    const handleCompletar = async (id) => {
        try {
            await juegoService.complete(id);
            cargarJuegos(); // Recargamos la lista completa
        } catch {
            alert('Error al completar el juego');
        }
    };

    const handleEliminar = async (id) => {
        if (!confirm('¿Seguro que deseas eliminar este título?')) return;
        try {
            await juegoService.delete(id);
            cargarJuegos();
        } catch {
            alert('Error al eliminar el juego');
        }
    };

    const handleJuegoCreado = () => {
        setMostrarModal(false);
        cargarJuegos();
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status" />
                <p className="mt-2">Cargando catálogo...</p>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Mi Catálogo</h2>
                <button className="btn btn-success" onClick={() => setMostrarModal(true)}>
                    Agregar Juego
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover bg-white shadow-sm rounded">
                    <thead className="table-dark">
                    <tr>
                        <th>Título</th>
                        <th>Género</th>
                        <th>Plataforma</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {juegos.length === 0
                        ? (
                            <tr>
                                <td colSpan="5" className="text-center text-muted py-4">
                                    No hay juegos en el catálogo todavía.
                                </td>
                            </tr>
                        )
                        : juegos.map(juego => (
                            <JuegoRow
                                key={juego.id}
                                juego={juego}
                                onCompletar={handleCompletar}
                                onEliminar={handleEliminar}
                            />
                        ))
                    }
                    </tbody>
                </table>
            </div>

            {mostrarModal && (
                <NuevoJuegoModal
                    onClose={() => setMostrarModal(false)}
                    onCreado={handleJuegoCreado}
                />
            )}
        </>
    );
}

export default DashboardPage;