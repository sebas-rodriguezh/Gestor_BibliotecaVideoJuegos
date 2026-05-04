const API_URL = 'http://localhost:8080/api';

const API = {
    // Método centralizado para hacer fetch al backend
    request: async (endpoint, method = 'GET', body = null) => {
        // Configuraciones base de la petición
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // Si tenemos un token guardado, se lo pegamos en la cabecera Authorization
        const token = Auth.getToken();
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        // Si hay un body (para POST o PUT), lo convertimos a texto JSON
        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(`${API_URL}${endpoint}`, options);

            // Si el backend nos lanza un 403 Forbidden o 401 Unauthorized, cerramos sesión
            if (response.status === 401 || response.status === 403) {
                Auth.logout();
                window.location.reload(); // Recargamos para que la SPA vuelva al login
                throw new Error("Sesión expirada o no autorizada");
            }

            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }

            if (response.status === 204) return null;

            if (response.status === 204) return null;

            // Leemos la respuesta como texto plano primero
            const text = await response.text();
            // Si hay texto, lo convertimos a JSON; si está vacío, devolvemos null
            return text ? JSON.parse(text) : null;

        } catch (error) {
            console.error("Error en API:", error);
            throw error;
        }
    }
};