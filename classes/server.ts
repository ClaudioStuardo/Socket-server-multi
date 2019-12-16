// npm install @types/express --save-dev
import express from 'express';
import { SERVER_PORT } from '../global/environment';
// npm install --save socket.io
// npm install @types/socket.io --save-dev
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';
import { eventDataTime, colorGreen } from '../config/config';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    // No crea otros sockets al llamar varias veces server.ts con private
    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        // Configuración de los Sockets
        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );
        this.escucharSockets();

    }

    start( callback: any ) {

        this.httpServer.listen( this.port, callback );
    }

    // Si ya existe una instancia, regresa esa instancia cuando se quiera obtener la funcion
    // Si no existe (primera ves que se llama la función) crea una instancia
    public static get instance() {

        return this._instance || ( this._instance = new this() );

    }

    private escucharSockets() {

        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {

            // Conectar cliente
            socket.conectarCliente( cliente );

            // Configuraciòn de mapas de Google
            socket.mapaSocketsGoogle( cliente );

            // Configuraciòn de mapas
            socket.mapaSockets( cliente, this.io );

            // Configurar usuario
            socket.configurarUsuario( cliente, this.io );

            // Obtener usuarios activos
            socket.obtenerUsuario( cliente, this.io );

            // Mensajes
            socket.mensaje( cliente, this.io );

            // Desconectar
            socket.desconectar( cliente, this.io );

        });

    }

}