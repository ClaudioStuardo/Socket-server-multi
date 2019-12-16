"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsuarioLista {
    constructor() {
        this.lista = [];
    }
    // Agregar un usuario
    agregar(usuario) {
        this.lista.push(usuario);
        return usuario;
    }
    // Agregar un usuario
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
    }
    // Obtener lista de usuario
    getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }
    // Obtener un usuario
    getUsuario(id) {
        return this.lista.find(usuario => usuario.id === id);
    }
    // Obtener usuarios en una sala en particular
    getUsuariosEnSala(sala) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }
    // Borrar Usuario
    borrarUsuario(id) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        return tempUsuario;
    }
}
exports.UsuarioLista = UsuarioLista;
