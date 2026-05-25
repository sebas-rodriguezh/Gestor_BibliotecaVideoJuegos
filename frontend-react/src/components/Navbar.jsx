function Navbar({ isAuthenticated, onLogout }) {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <span className="navbar-brand mb-0 h1">Gestor de Videojuegos</span>

                {isAuthenticated && (
                    <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
                        Cerrar Sesión
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;