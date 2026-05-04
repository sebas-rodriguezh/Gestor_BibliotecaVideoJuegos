const App = {
    // 1. Inicializar la app
    init: () => {
        // Asignamos los eventos a los botones y formularios
        document.getElementById('login-form').addEventListener('submit', App.handleLogin);
        document.getElementById('btn-logout').addEventListener('click', App.handleLogout);
        document.getElementById('btn-nuevo-juego').addEventListener('click', App.crearJuegoBasico);

        // Revisamos la "memoria" para saber qué pantalla mostrar al inicio
        if (Auth.isAuthenticated()) {
            UI.showDashboard();
            App.cargarJuegos();
        } else {
            UI.showLogin();
        }
    },

    // 2. Lógica del Login
    handleLogin: async (e) => {
        e.preventDefault(); // Evita que la página recargue al hacer submit

        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;

        try {
            // Usamos nuestro interceptor centralizado
            const response = await API.request('/auth/login', 'POST', {
                username: usernameInput,
                password: passwordInput
            });

            // Guardamos el token que nos devuelve el backend
            Auth.setToken(response.token);

            // Cambiamos la vista y cargamos el catálogo
            UI.showDashboard();
            App.cargarJuegos();

        } catch (error) {
            alert("Credenciales incorrectas o problema de red.");
        }
    },

    // 3. Lógica del Logout
    handleLogout: () => {
        Auth.logout();
        UI.showLogin();
    },

    // 4. Obtener juegos y dibujarlos
    cargarJuegos: async () => {
        try {
            const juegos = await API.request('/juegos', 'GET');
            UI.renderJuegos(juegos);
        } catch (error) {
            console.error("Error al cargar la lista de juegos", error);
        }
    },

    // 5. Completar un juego (PATCH)
    completarJuego: async (id) => {
        try {
            await API.request(`/juegos/${id}/completar`, 'PATCH');
            App.cargarJuegos(); // Recargamos la tabla para ver el cambio
        } catch (error) {
            alert("Error al actualizar el juego");
        }
    },

    // 6. Eliminar un juego (DELETE)
    eliminarJuego: async (id) => {
        if(confirm("¿Seguro que deseas eliminar este título de tu biblioteca?")) {
            try {
                await API.request(`/juegos/${id}`, 'DELETE');
                App.cargarJuegos(); // Recargamos la tabla
            } catch (error) {
                alert("Error al eliminar el juego");
            }
        }
    },

    // 7. Crear un nuevo juego (POST)
    crearJuegoBasico: async () => {
        // Para mantener la simplicidad sin ensuciar el HTML con modales, usaremos prompts nativos.
        const titulo = prompt("Título del videojuego:");
        if (!titulo) return; // Si el usuario cancela, salimos

        const genero = prompt("Género:");
        const plataforma = prompt("Plataforma:");

        const nuevoJuego = {
            titulo: titulo,
            genero: genero,
            plataforma: plataforma,
            completado: false
        };

        try {
            await API.request('/juegos', 'POST', nuevoJuego);
            App.cargarJuegos();
        } catch (error) {
            alert("No tienes permisos o hubo un error al guardar el juego");
        }
    }
};

// Arrancar la aplicación cuando el HTML termine de cargar
document.addEventListener("DOMContentLoaded", App.init);

/*

api.js maneja la red.
auth.js maneja la sesión.
ui.js dibuja en pantalla.
app.js maneja los eventos.

 */