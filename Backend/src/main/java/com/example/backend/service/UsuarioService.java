package com.example.backend.service;

import com.example.backend.model.Usuario;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService
{

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository)
    {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario obtenerPerfil(String username) throws Exception
    {
        return usuarioRepository.findByUsername(username).orElseThrow(() -> new Exception("El usuario solicitado no existe en la base de datos"));
    }

}