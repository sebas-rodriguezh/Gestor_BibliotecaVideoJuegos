import { useState } from 'react';
import { juegoService } from '../services/api';

function NuevoJuegoModal({ onClose, onCreado }) {
    const [form, setForm] = useState({
        titulo: '',
        genero: '',
        plataforma: '',
        completado: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Manejador genérico para todos los campos del formulario
    // Esto evita tener un useState separado por cada campo
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await juegoService.create(form);
            onCreado(); // Avisamos al padre que se creó con éxito
        } catch {
            setError('Error al guardar el juego. Verifica tu sesión.');
        } finally {
            setLoading(false);
        }
    };

    return (
        // Overlay oscuro detrás del modal
        <div
            className="modal show d-block"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={onClose} // Cerrar al hacer clic fuera
        >
            <div
                className="modal-dialog"
                onClick={e => e.stopPropagation()} // Evitar que el clic dentro cierre el modal
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Nuevo Juego</h5>
                        <button className="btn-close" onClick={onClose} />
                    </div>

                    <div className="modal-body">
                        {error && <div className="alert alert-danger">{error}</div>}

                        <form onSubmit={handleSubmit} id="form-nuevo-juego">
                            <div className="mb-3">
                                <label className="form-label">Título</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="titulo"
                                    value={form.titulo}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Género</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="genero"
                                    value={form.genero}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Plataforma</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="plataforma"
                                    value={form.plataforma}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            form="form-nuevo-juego"
                            className="btn btn-success"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : 'Guardar Juego'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevoJuegoModal;