package com.example.backend.model;

// Este DTO: Es el sobre que le devolvemos al Frontend con la llave.

public class AuthResponse {
    private String token;
    private String username;
    private String nombreCompleto;
    private String email;

    public AuthResponse(String token, String username, String nombreCompleto, String email) {
        this.token = token;
        this.username = username;
        this.nombreCompleto = nombreCompleto;
        this.email = email;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getNombreCompleto() { return nombreCompleto; }
    public void setNombreCompleto(String nombreCompleto) { this.nombreCompleto = nombreCompleto; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}