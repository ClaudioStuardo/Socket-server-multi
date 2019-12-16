"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
const socket_1 = require("../sockets/socket");
const encuesta_1 = require("../classes/encuesta");
const grafica_1 = require("../classes/grafica");
const mapa_google_1 = require("../classes/mapa-google");
const mapa_1 = require("../classes/mapa");
const router = express_1.Router();
const grafica = new grafica_1.GraficaData();
const encuesta = new encuesta_1.EncuestaData();
const mapa = new mapa_1.Mapa();
exports.mapaGoogle = new mapa_google_1.MapaGoogle();
const lugares = [
    {
        id: '1',
        nombre: 'Claudio',
        lng: -70.5760839341368,
        lat: -33.60938955134184,
    },
    {
        id: '2',
        nombre: 'Gaby',
        lng: -70.57552044408271,
        lat: -33.60954313758824,
    },
    {
        id: '3',
        nombre: 'Emilia',
        lng: -70.57520284059721,
        lat: -33.60967965846575,
    }
];
// Los inserta como objetos independientes
exports.mapaGoogle.marcadores.push(...lugares);
router.get('/mapa-google', (req, res) => {
    res.json(exports.mapaGoogle.getMarcadores());
});
router.get('/mapa', (req, res) => {
    res.json(mapa.getMarcadores());
});
router.get('/encuesta', (req, res) => {
    res.json(encuesta.getDataGrafica());
});
router.post('/encuesta', (req, res) => {
    const opcion = Number(req.body.opcion);
    const valores = Number(req.body.valores);
    encuesta.editarValor(opcion, valores);
    const server = server_1.default.instance;
    server.io.emit('cambio-encuesta', encuesta.getDataGrafica());
    res.json(encuesta.getDataGrafica());
});
router.get('/grafica', (req, res) => {
    res.json(grafica.getDataGrafica());
});
router.post('/grafica', (req, res) => {
    const mes = req.body.mes;
    const unidades = Number(req.body.unidades);
    grafica.editarValor(mes, unidades);
    const server = server_1.default.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica());
    res.json(grafica.getDataGrafica());
});
router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'GET-LISTO'
    });
});
router.post('/mensajes', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        cuerpo,
        de
    });
});
router.post('/mensajes/:id', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});
// Servicio para obtener todos los IDs de todos los usuarios
router.get('/usuarios', (req, res) => {
    const server = server_1.default.instance;
    server.io.clients((err, clientes) => {
        if (err) {
            res.json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            clientes
        });
    });
});
// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req, res) => {
    const server = server_1.default.instance;
    server.io.clients((err, clientes) => {
        if (err) {
            res.json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            clientes: socket_1.usuariosConectados.getLista()
        });
    });
});
exports.default = router;
