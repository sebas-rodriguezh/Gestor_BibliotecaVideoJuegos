package com.example.backend.security;

import com.example.backend.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/*

Este filtro interceptará todas las peticiones que lleguen al servidor,
buscará si traen una llave (el token),
 verificará si la llave es original, y si todo está en orden, le abrirá la puerta de Spring Security para dejar pasar la solicitud.

En resumen: El filtro revisará las cabeceras HTTP en cada petición.
 */


@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    public JwtFilter(JwtUtil jwtUtil, CustomUserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        // 1. Extraemos la cabecera "Authorization" de la petición
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        // 2. Verificamos que el token venga en el formato correcto ("Bearer eyJhbGci...")
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // Quitamos la palabra "Bearer "
            try {
                username = jwtUtil.extraerUsername(jwt);
            } catch (Exception e) {
                System.out.println("Token inválido, expirado o modificado.");
            }
        }

        // 3. Si encontramos un usuario válido y no hay nadie logueado aún en este hilo de ejecución
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            // 4. Validamos la firma criptográfica matemáticamente
            if (jwtUtil.validarToken(jwt, userDetails.getUsername())) {

                // 5. ¡Pase autorizado! Le decimos a Spring Security que este usuario es de confianza
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // 6. Finalmente, dejamos que la petición continúe su camino
        chain.doFilter(request, response);
    }
}