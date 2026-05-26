import { authStorage } from './auth.js';

const API_BASE = '/api';

const request = async (endpoint, method = 'GET', body = null) => {
    const headers = { 'Content-Type': 'application/json' };

    const token = authStorage.getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${API_BASE}${endpoint}`, options);

    if (response.status === 401 || response.status === 403) {
        authStorage.removeToken();
        window.location.href = '/login';
        throw new Error('Sesión expirada');
    }

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || `Error ${response.status}`);
    }

    if (response.status === 204) return null;

    const text = await response.text();
    return text ? JSON.parse(text) : null;
};

export const authService = {
    login: (username, password) => request('/auth/login', 'POST', { username, password }),
    register: (usuarioData) => request('/auth/register', 'POST', usuarioData),
};

export const juegoService = {
    getAll: ()=> request('/juegos'),
    getById: (id)=> request(`/juegos/${id}`),
    create: (juego)=> request('/juegos', 'POST', juego),
    update: (id, juego)=> request(`/juegos/${id}`, 'PUT', juego),
    delete: (id)=> request(`/juegos/${id}`, 'DELETE'),
    complete: (id)=> request(`/juegos/${id}/completar`, 'PATCH'),
    getByGenero: (genero)=> request(`/juegos/buscar?genero=${genero}`),
};


export const usuarioService = {
    getMe: ()=> request('/usuarios/me'),
};