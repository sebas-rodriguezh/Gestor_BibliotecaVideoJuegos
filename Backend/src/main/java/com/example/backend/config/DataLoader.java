package com.example.backend.config;

import com.example.backend.model.Juego;
import com.example.backend.model.Usuario;
import com.example.backend.repository.JuegoRepository;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component
public class DataLoader implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final JuegoRepository juegoRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UsuarioRepository usuarioRepository, JuegoRepository juegoRepository, PasswordEncoder passwordEncoder)
    {
        this.usuarioRepository = usuarioRepository;
        this.juegoRepository = juegoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (usuarioRepository.count() == 0)
        {
            System.out.println("Cargando usuarios de prueba...");

            Usuario admin = new Usuario("admin", passwordEncoder.encode("admin123"), "admin@biblioteca.com", "Administrador del Sistema");
            Usuario user = new Usuario("jugador1", passwordEncoder.encode("clave123"), "jugador1@biblioteca.com", "Juan Pérez");

            usuarioRepository.save(admin);
            usuarioRepository.save(user);
        }

        if (juegoRepository.count() == 0)
        {
            System.out.println("Cargando catálogo de videojuegos inicial...");

            Juego juego1 = new Juego("The Legend of Zelda: Breath of the Wild","Retro", "Nintendo Switch", false);
            Juego juego2 = new Juego("EA 26","Deportes", "PS4/PS5", false);
            Juego juego3 = new Juego("GTA 6","Violencia", "PS5", false);

            juegoRepository.save(juego1);
            juegoRepository.save(juego2);
            juegoRepository.save(juego3);
        }
        System.out.println("Carga de datos finalizada exitosamente.");
    }
}
