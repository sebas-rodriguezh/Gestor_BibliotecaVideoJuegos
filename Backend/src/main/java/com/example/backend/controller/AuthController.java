package com.example.backend.controller;

import com.example.backend.model.AuthRequest;
import com.example.backend.model.AuthResponse;
import com.example.backend.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;


/*

Este es nuestro "recepcionista". Se apoya en el AuthenticationManager de Spring Security
(que es el guardia que verifica que la clave sea correcta)
 y en nuestro JwtUtil (la fábrica).

 */

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) throws Exception {
        try {
            // 1. El "guardia" revisa que las credenciales coincidan con las registradas en memoria
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        } catch (Exception e) {
            throw new Exception("Usuario o contraseña incorrectos");
        }

        // 2. Si pasó la validación, buscamos la ficha técnica del usuario
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());

        // 3. La fábrica construye el token sellado para este usuario específico
        final String jwt = jwtUtil.generarToken(userDetails.getUsername());

        // 4. Devolvemos el token envuelto en nuestra clase de respuesta
        return new AuthResponse(jwt);
    }

    // Acá en un futuro iría también el de registrarse.
}