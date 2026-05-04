package com.example.backend.controller;

import com.example.backend.model.Juego;
import com.example.backend.service.JuegoService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/juegos")
@CrossOrigin(origins = "*")
public class JuegoController {

    private final JuegoService service;

    public JuegoController(JuegoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Juego> obtenerTodos() {
        return service.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Juego obtenerPorId(@PathVariable("id") String id) throws Exception {
        return service.obtenerPorId(id);
    }

    @PostMapping
    public Juego crear(@RequestBody Juego juego) {
        return service.guardar(juego);
    }

    @PutMapping("/{id}")
    public Juego actualizar(@PathVariable("id") String id, @RequestBody Juego juego) throws Exception {
        return service.actualizar(id, juego);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable("id") String id) {
        service.eliminar(id);
    }

    // Fuera de las operaciones CRUD.

    @GetMapping("/buscar")
    public List<Juego> buscarPorGenero(@RequestParam("genero") String genero) throws Exception
    {
        return service.buscarPorGenero(genero);
    }

    @PatchMapping("/{id}/completar")
    public Juego marcarComoCompletado(@PathVariable("id") String id) throws Exception
    {
        return service.marcarComoCompletado(id);
    }
}
//e42a0ec8