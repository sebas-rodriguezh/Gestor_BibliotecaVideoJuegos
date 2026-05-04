package com.example.backend.repository;

import com.example.backend.model.Juego;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

//Esta clase sería como el DataLoader.

@Repository
public class JuegoRepository {

    private final Map<String, Juego> baseDeDatos = new HashMap<>();

    public JuegoRepository() {
        Juego j1 = new Juego("EA SPORTS FC 24", "Deportes", "PlayStation", false);
        Juego j2 = new Juego("Call of Duty: Warzone", "Shooter", "PlayStation", false);

        baseDeDatos.put(j1.getId(), j1);
        baseDeDatos.put(j2.getId(), j2);
    }

    public List<Juego> findAll() {
        return new ArrayList<>(baseDeDatos.values());
    }

    public Optional<Juego> findById(String id) {
        return Optional.ofNullable(baseDeDatos.get(id));
    }

    public Juego save(Juego juego) {
        if (juego.getId() == null || juego.getId().isEmpty()) {
            juego.setId(java.util.UUID.randomUUID().toString().substring(0, 8));
        }
        baseDeDatos.put(juego.getId(), juego);
        return juego;
    }

    public void deleteById(String id) {
        baseDeDatos.remove(id);
    }
}