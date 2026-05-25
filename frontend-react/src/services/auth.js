const TOKEN_KEY = 'jwt_videojuegos';

export const authStorage = {
    getToken:        ()      => localStorage.getItem(TOKEN_KEY),
    setToken:        (token) => localStorage.setItem(TOKEN_KEY, token),
    removeToken:     ()      => localStorage.removeItem(TOKEN_KEY),
    isAuthenticated: ()      => localStorage.getItem(TOKEN_KEY) !== null,
};