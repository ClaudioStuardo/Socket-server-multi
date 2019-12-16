"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EncuestaData {
    constructor() {
        this.Preguntas = [];
        this.valores = [0, 0, 0, 0];
    }
    setLabels(preguntas) {
        this.Preguntas = preguntas;
    }
    getDataGrafica() {
        return [
            { data: this.valores, label: 'Preguntas' }
        ];
    }
    editarValor(opcion, valor) {
        this.valores[opcion] += valor;
        return this.getDataGrafica();
    }
}
exports.EncuestaData = EncuestaData;
