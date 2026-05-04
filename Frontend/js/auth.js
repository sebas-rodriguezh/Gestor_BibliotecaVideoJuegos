const Auth = {
    // Guarda el token en el navegador
    setToken: (token) => {
        localStorage.setItem('jwt_videojuegos', token);
    },

    // Recupera el token
    getToken: () => {
        return localStorage.getItem('jwt_videojuegos');
    },

    // Elimina el token (Cerrar sesión)
    logout: () => {
        localStorage.removeItem('jwt_videojuegos');
    },

    // Retorna true si existe un token, false si no
    isAuthenticated: () => {
        return localStorage.getItem('jwt_videojuegos') !== null;
    }
};