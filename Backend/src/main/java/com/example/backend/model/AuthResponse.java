package com.example.backend.model;

// Este DTO: Es el sobre que le devolvemos al Frontend con la llave.

public class AuthResponse {
    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}