package com.example.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

/*
Esta clase se encarga de:

1. Construir el token cuando el administrador se loguea correctamente,
2. Desarmar el token para comprobar que no haya expirado ni haya sido alterado por un tercero.

 */

@Component
public class JwtUtil {

    private final String SECRET = "MiClaveSecretaSuperSeguraYExtremadamenteLargaParaFirmarJWT123!";

    private final long EXPIRATION_TIME = 3600000;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    // Fabricar el token.
    public String generarToken(String username) {
        return Jwts.builder()
                .setSubject(username) // A quién le pertenece el token
                .setIssuedAt(new Date(System.currentTimeMillis())) // Fecha de creación
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Fecha de caducidad
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // Firma criptográfica
                .compact(); // Ensambla el token en un String
    }

    // Validar el token
    public boolean validarToken(String token, String username) {
        final String tokenUsername = extraerUsername(token);
        return (tokenUsername.equals(username) && !isTokenExpirado(token));
    }


    public String extraerUsername(String token) {
        return extraerTodasLasReclamaciones(token).getSubject();
    }

    private boolean isTokenExpirado(String token) {
        return extraerTodasLasReclamaciones(token).getExpiration().before(new Date());
    }

    private Claims extraerTodasLasReclamaciones(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token) // Si el token fue alterado, esto lanza una excepción y falla
                .getBody();
    }
}