package com.example.backend.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


//Acá simplemente movimos el usuario al servicio propio. Para evitar el error de dependencia circular.

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Por ahora mantenemos a nuestro administrador estático en memoria
        if ("admin".equals(username)) {
            return User.withUsername("admin")
                    .password("{noop}admin123") // {noop} significa sin encriptar (solo para pruebas)
                    .roles("ADMIN")
                    .build();
        } else {
            throw new UsernameNotFoundException("Usuario no encontrado: " + username);
        }
    }
}