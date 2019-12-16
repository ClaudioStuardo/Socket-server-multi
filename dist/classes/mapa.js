"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mapa {
    constructor() {
        this.marcadores = {
            '1': {
                id: '1',
                nombre: 'Claudio',
                lng: -70.5760839341368,
                lat: -33.60938955134184,
                color: '#19884b'
            },
            '2': {
                id: '2',
                nombre: 'Gaby',
                lng: -70.57552044408271,
                lat: -33.60954313758824,
                color: '#790af0'
            },
            '3': {
                id: '3',
                nombre: 'Emilia',
                lng: -70.57520284059721,
                lat: -33.60967965846575,
                color: '#dd8fee'
            }
        };
    }
    getMarcadores() {
        return this.marcadores;
    }
    borrarMarcador(id) {
        delete this.marcadores[id];
        return this.getMarcadores();
    }
    agregarMarcador(marcador) {
        this.marcadores[marcador.id] = marcador;
    }
    moverMarcador(marcador) {
        this.marcadores[marcador.id].lng = marcador.lng;
        this.marcadores[marcador.id].lat = marcador.lat;
    }
}
exports.Mapa = Mapa;
