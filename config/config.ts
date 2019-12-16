// Función para obtener fecha
export function eventDataTime(): string {
    return `${ new Date().toLocaleDateString() } / ${ new Date().toLocaleTimeString()}`;
}

// Texto Verde
export function colorGreen(): string {
    return '\x1b[32m%s\x1b[0m';
}

// Texto Rojo
export function colorRed(): string {
    return '\x1b[0;31m%s\x1b[0m';
}

// Texto Amarillo
export function colorYellow(): string {
    return '\x1b[0;33m%s\x1b[0m';
}

// Texto Burdeo
export function colorBurgundy(): string {
    return '\x1b[0;36m%s\x1b[0m';
}
