import { Socket } from 'socket.io';
import { eventDataTime, colorRed, colorYellow, colorGreen } from '../config/config';
import socketIO from 'socket.io';
import { UsuarioLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';
import { Mapa } from '../classes/mapa';
import { Marcador } from '../classes/marcador';
import { MarcadorGoogle } from '../classes/marcador-google';
import { mapaGoogle } from '../routes/router';

export const usuariosConectados = new UsuarioLista();
export const mapa = new Mapa();

// Eventos mapa de google
export const mapaSocketsGoogle = ( cliente: Socket ) => {

    cliente.on('marcador-nuevo-google', ( marcador: MarcadorGoogle ) => {

        mapaGoogle.agregarMarcador( marcador );

        // Se manda a todos menos al cliente
        cliente.broadcast.emit('marcador-nuevo-google', marcador);

    });

    cliente.on('marcador-mover-google', ( marcador: MarcadorGoogle ) => {

        mapaGoogle.moverMarcador( marcador );

        // Se manda a todos menos al cliente
        cliente.broadcast.emit('marcador-mover-google', marcador);

    });

    cliente.on('marcador-borrar-google', ( id: string ) => {

        mapaGoogle.borrarMarcador( id );

        // Se manda a todos menos al cliente
        cliente.broadcast.emit('marcador-borrar-google', id);

    });
}

// Eventos de mapa
export const mapaSockets = ( cliente: Socket, io: SocketIO.Server ) => {

    cliente.on('marcador-nuevo', ( marcador: Marcador ) => {

        mapa.agregarMarcador( marcador );

        // Se manda a todos menos al cliente
        cliente.broadcast.emit('marcador-nuevo', marcador);

    });

    cliente.on('marcador-mover', ( marcador: Marcador ) => {

        mapa.moverMarcador( marcador );

        // Se manda a todos menos al cliente
        cliente.broadcast.emit('marcador-mover', marcador);

    });

    cliente.on('marcador-borrar', ( id: string ) => {

        mapa.borrarMarcador( id );

        // Se manda a todos menos al cliente
        cliente.broadcast.emit('marcador-borrar', id);

    });
}

export const conectarCliente = ( cliente: Socket ) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );
    console.log(colorGreen(), 'Cliente conectado. (Fecha: '+ eventDataTime() + ')');
}

export const desconectar = ( cliente: Socket, io: SocketIO.Server ) => {
        
    cliente.on('disconnect', () => {
        const nombreUsuario = usuariosConectados.borrarUsuario( cliente.id );
        console.log(colorRed(), 'Cliente desconectado -'+ nombreUsuario +'-. (Fecha: ' + eventDataTime() + ')');

        io.emit('usuarios-activos', usuariosConectados.getLista());
    })

}

// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {

        console.log(colorYellow(), 'Mensaje recibido: ', payload);

        io.emit('mensaje-nuevo', payload);

    });

}
// Configurar usuario
export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: any ) => {

        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );

        io.emit('usuarios-activos', usuariosConectados.getLista());

        // console.log(colorBurgundy(), 'Configurando Usuario: ', payload.nombre);

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });

        // io.emit('mensaje-nuevo', payload);

    });

}

// Obtener Usuarios
export const obtenerUsuario = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('obtener-usuario', () => {

        io.to( cliente.id ).emit('usuarios-activos', usuariosConectados.getLista());

    });

}
