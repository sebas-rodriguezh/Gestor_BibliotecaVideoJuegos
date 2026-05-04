const UI = {
    // Alternar a la vista de Login
    showLogin: () => {
        document.getElementById('login-view').classList.remove('d-none');
        document.getElementById('dashboard-view').classList.add('d-none');
        document.getElementById('btn-logout').classList.add('d-none');
    },

    // Alternar a la vista del Dashboard
    showDashboard: () => {
        document.getElementById('login-view').classList.add('d-none');
        document.getElementById('dashboard-view').classList.remove('d-none');
        document.getElementById('btn-logout').classList.remove('d-none');
    },

    // Dibujar la tabla de juegos
    renderJuegos: (juegos) => {
        const tbody = document.getElementById('tabla-juegos');
        tbody.innerHTML = ''; // Limpiamos la tabla antes de dibujar

        juegos.forEach(juego => {
            const tr = document.createElement('tr');

            // Renderizamos un pequeño "badge" visual para el estado
            const estadoHtml = juego.completado
                ? '<span class="badge bg-success">Completado</span>'
                : '<span class="badge bg-warning text-dark">Pendiente</span>';

            // Renderizamos los botones de acción
            let accionesHtml = '';
            // Solo mostramos el botón de completar si el juego está pendiente
            if (!juego.completado) {
                accionesHtml += `<button class="btn btn-sm btn-primary me-2" onclick="App.completarJuego('${juego.id}')">Marcar Completado</button>`;
            }
            accionesHtml += `<button class="btn btn-sm btn-danger" onclick="App.eliminarJuego('${juego.id}')">Eliminar</button>`;

            tr.innerHTML = `
                <td>${juego.titulo}</td>
                <td>${juego.genero}</td>
                <td>${juego.plataforma}</td>
                <td>${estadoHtml}</td>
                <td>${accionesHtml}</td>
            `;
            tbody.appendChild(tr);
        });
    }
};