"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// npm install @types/express --save-dev
const express_1 = __importDefault(require("express"));
const environment_1 = require("../global/environment");
// npm install --save socket.io
// npm install @types/socket.io --save-dev
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const socket = __importStar(require("../sockets/socket"));
class Server {
    // No crea otros sockets al llamar varias veces server.ts con private
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        // Configuración de los Sockets
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        this.escucharSockets();
    }
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
    // Si ya existe una instancia, regresa esa instancia cuando se quiera obtener la funcion
    // Si no existe (primera ves que se llama la función) crea una instancia
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    escucharSockets() {
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente => {
            // Conectar cliente
            socket.conectarCliente(cliente);
            // Configuraciòn de mapas de Google
            socket.mapaSocketsGoogle(cliente);
            // Configuraciòn de mapas
            socket.mapaSockets(cliente, this.io);
            // Configurar usuario
            socket.configurarUsuario(cliente, this.io);
            // Obtener usuarios activos
            socket.obtenerUsuario(cliente, this.io);
            // Mensajes
            socket.mensaje(cliente, this.io);
            // Desconectar
            socket.desconectar(cliente, this.io);
        });
    }
}
exports.default = Server;
