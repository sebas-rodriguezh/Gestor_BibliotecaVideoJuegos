package com.example.backend.service;

import com.example.backend.model.Juego;
import com.example.backend.repository.JuegoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JuegoService {

    private final JuegoRepository repository;

    public JuegoService(JuegoRepository repository) {
        this.repository = repository;
    }

    public List<Juego> obtenerTodos() {
        return repository.findAll();
    }

    public Juego obtenerPorId(String id) throws Exception {
        return repository.findById(id).orElseThrow(() -> new Exception("Juego no encontrado"));
    }

    public Juego guardar(Juego juego) {
        return repository.save(juego);
    }

    public Juego actualizar(String id, Juego juegoActualizado) throws Exception {
        Juego existente = obtenerPorId(id);
        existente.setTitulo(juegoActualizado.getTitulo());
        existente.setGenero(juegoActualizado.getGenero());
        existente.setPlataforma(juegoActualizado.getPlataforma());
        existente.setCompletado(juegoActualizado.isCompletado());

        return repository.save(existente);
    }

    public void eliminar(String id) {
        repository.deleteById(id);
    }
}