package com.example.backend.model;

public class UpdatePerfilRequest {

    private String nombreCompleto;
    private String email;

    public UpdatePerfilRequest() {}

    public String getNombreCompleto() { return nombreCompleto; }
    public void setNombreCompleto(String nombreCompleto) { this.nombreCompleto = nombreCompleto; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}