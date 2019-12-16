"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Función para obtener fecha
function eventDataTime() {
    return `${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`;
}
exports.eventDataTime = eventDataTime;
// Texto Verde
function colorGreen() {
    return '\x1b[32m%s\x1b[0m';
}
exports.colorGreen = colorGreen;
// Texto Rojo
function colorRed() {
    return '\x1b[0;31m%s\x1b[0m';
}
exports.colorRed = colorRed;
// Texto Amarillo
function colorYellow() {
    return '\x1b[0;33m%s\x1b[0m';
}
exports.colorYellow = colorYellow;
// Texto Burdeo
function colorBurgundy() {
    return '\x1b[0;36m%s\x1b[0m';
}
exports.colorBurgundy = colorBurgundy;
