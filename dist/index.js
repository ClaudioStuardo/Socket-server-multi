"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const router_1 = __importDefault(require("./routes/router"));
const bodyParser = require("body-parser");
// npm install @types/cors --save-dev
const cors_1 = __importDefault(require("cors"));
const server = server_1.default.instance;
// BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
// CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Rutas de servicios
server.app.use('/', router_1.default);
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
