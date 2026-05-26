package com.example.backend.service;

import com.example.backend.model.AuthRequest;
import com.example.backend.model.AuthResponse;
import com.example.backend.model.RegisterRequest;
import com.example.backend.model.Usuario;
import com.example.backend.repository.UsuarioRepository;
import com.example.backend.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtil jwtUtil)
    {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }


    public String registrarUsuario(RegisterRequest request) throws Exception {

        if (usuarioRepository.existsByUsername(request.getUsername())) {
            throw new Exception("El nombre de usuario ya está en uso.");
        }
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new Exception("El correo electrónico ya está registrado.");
        }

        Usuario nuevoUsuario = new Usuario(
                request.getUsername(),
                passwordEncoder.encode(request.getPassword()),
                request.getEmail(),
                request.getNombreCompleto()
        );

        usuarioRepository.save(nuevoUsuario);

        return "Usuario registrado exitosamente";
    }


    public AuthResponse autenticarUsuario(AuthRequest request) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        } catch (Exception e) {
            throw new Exception("Usuario o contraseña incorrectos");
        }

        Usuario usuario = usuarioRepository.findByUsername(request.getUsername()).orElseThrow(() -> new Exception("Usuario no encontrado en la base de datos"));

        String jwt = jwtUtil.generarToken(usuario.getUsername());

        return new AuthResponse(jwt, usuario.getUsername(), usuario.getNombreCompleto(), usuario.getEmail());
    }
}