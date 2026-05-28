package com.example.backend.service;

import com.example.backend.model.UpdatePerfilRequest;
import com.example.backend.model.Usuario;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario obtenerPerfil(String username) throws Exception {
        return usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new Exception("El usuario solicitado no existe en la base de datos"));
    }

    public Usuario actualizarPerfil(String username, UpdatePerfilRequest request) throws Exception {
        Usuario usuario = obtenerPerfil(username);

        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            boolean emailEnUso = usuarioRepository.findByEmail(request.getEmail())
                    .map(u -> !u.getUsername().equals(username))
                    .orElse(false);
            if (emailEnUso) {
                throw new Exception("El correo electrónico ya está registrado por otro usuario.");
            }
            usuario.setEmail(request.getEmail());
        }

        if (request.getNombreCompleto() != null && !request.getNombreCompleto().isBlank()) {
            usuario.setNombreCompleto(request.getNombreCompleto());
        }

        return usuarioRepository.save(usuario);
    }
}