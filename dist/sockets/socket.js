"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const usuarios_lista_1 = require("../classes/usuarios-lista");
const usuario_1 = require("../classes/usuario");
const mapa_1 = require("../classes/mapa");
const router_1 = require("../routes/router");
exports.usuariosConectados = new usuarios_lista_1.UsuarioLista();
exports.mapa = new mapa_1.Mapa();
// Eventos mapa de google
exports.mapaSocketsGoogle = (cliente) => {
    cliente.on('marcador-nuevo-google', (marcador) => {
        router_1.mapaGoogle.agregarMarcador(marcador);
        // Se manda a todos menos al cliente
        cliente.broadcast.emit('marcador-nuevo-google', marcador);
    });
    cliente.on('marcador-mover-google', (marcador) => {
        router_1.mapaGoogle.moverMarcador(marcador);
        // Se manda a todos menos al cliente
        cliente.broadcast.emit('marcador-mover-google', marcador);
    });
    cliente.on('marcador-borrar-google', (id) => {
        router_1.mapaGoogle.borrarMarcador(id);
        // Se manda a todos menos al cliente
        cliente.broadcast.emit('marcador-borrar-google', id);
    });
};
// Eventos de mapa
exports.mapaSockets = (cliente, io) => {
    cliente.on('marcador-nuevo', (marcador) => {
        exports.mapa.agregarMarcador(marcador);
        // Se manda a todos menos al cliente
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });
    cliente.on('marcador-mover', (marcador) => {
        exports.mapa.moverMarcador(marcador);
        // Se manda a todos menos al cliente
        cliente.broadcast.emit('marcador-mover', marcador);
    });
    cliente.on('marcador-borrar', (id) => {
        exports.mapa.borrarMarcador(id);
        // Se manda a todos menos al cliente
        cliente.broadcast.emit('marcador-borrar', id);
    });
};
exports.conectarCliente = (cliente) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
    console.log(config_1.colorGreen(), 'Cliente conectado. (Fecha: ' + config_1.eventDataTime() + ')');
};
exports.desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        const nombreUsuario = exports.usuariosConectados.borrarUsuario(cliente.id);
        console.log(config_1.colorRed(), 'Cliente desconectado -' + nombreUsuario + '-. (Fecha: ' + config_1.eventDataTime() + ')');
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
// Escuchar mensajes
exports.mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log(config_1.colorYellow(), 'Mensaje recibido: ', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
// Configurar usuario
exports.configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        // console.log(colorBurgundy(), 'Configurando Usuario: ', payload.nombre);
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
        // io.emit('mensaje-nuevo', payload);
    });
};
// Obtener Usuarios
exports.obtenerUsuario = (cliente, io) => {
    cliente.on('obtener-usuario', () => {
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
