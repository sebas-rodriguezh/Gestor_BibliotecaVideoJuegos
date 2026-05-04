package com.example.backend.model;

import java.io.Serializable;
import java.util.UUID;

public class Juego implements Serializable {
    private String id;
    private String titulo;
    private String genero;
    private String plataforma;
    private boolean completado;

    public Juego() {}

    public Juego(String titulo, String genero, String plataforma, boolean completado) {
        this.id = UUID.randomUUID().toString().substring(0, 8);
        this.titulo = titulo;
        this.genero = genero;
        this.plataforma = plataforma;
        this.completado = completado;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getGenero() { return genero; }
    public void setGenero(String genero) { this.genero = genero; }

    public String getPlataforma() { return plataforma; }
    public void setPlataforma(String plataforma) { this.plataforma = plataforma; }

    public boolean isCompletado() { return completado; }
    public void setCompletado(boolean completado) { this.completado = completado; }
}