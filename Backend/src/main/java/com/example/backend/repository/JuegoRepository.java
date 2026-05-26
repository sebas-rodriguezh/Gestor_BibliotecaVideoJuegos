package com.example.backend.repository;

import com.example.backend.model.Juego;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JuegoRepository extends JpaRepository<Juego, String> {
    List<Juego> findByGeneroIgnoreCase(String genero);
}