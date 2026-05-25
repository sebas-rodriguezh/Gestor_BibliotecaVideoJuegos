function JuegoRow({ juego, onCompletar, onEliminar }) {
    return (
        <tr>
            <td>{juego.titulo}</td>
            <td>{juego.genero}</td>
            <td>{juego.plataforma}</td>
            <td>
                {juego.completado
                    ? <span className="badge bg-success">Completado</span>
                    : <span className="badge bg-warning text-dark">Pendiente</span>
                }
            </td>
            <td>
                {!juego.completado && (
                    <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => onCompletar(juego.id)}
                    >
                        Marcar Completado
                    </button>
                )}
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onEliminar(juego.id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
}

export default JuegoRow;