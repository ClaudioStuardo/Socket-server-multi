"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MapaGoogle {
    constructor() {
        this.marcadores = [];
    }
    getMarcadores() {
        return this.marcadores;
    }
    agregarMarcador(marcador) {
        this.marcadores.push(marcador);
    }
    borrarMarcador(id) {
        this.marcadores = this.marcadores.filter(mark => mark.id !== id);
        return this.marcadores;
    }
    moverMarcador(marcador) {
        for (const i in this.marcadores) {
            if (this.marcadores[i].id === marcador.id) {
                this.marcadores[i].lat = marcador.lat;
                this.marcadores[i].lng = marcador.lng;
                break;
            }
        }
    }
}
exports.MapaGoogle = MapaGoogle;
