export class EncuestaData {

    private Preguntas: string[] = [];
    private valores: number[] = [0, 0, 0, 0];

    constructor() {}

    setLabels( preguntas: string[] ) {
        this.Preguntas = preguntas;
    }

    getDataGrafica() {
        return [
            { data: this.valores, label: 'Preguntas' }
        ]
    }

    editarValor( opcion: number, valor: number ) {
       
        this.valores[opcion] += valor;
        return this.getDataGrafica();

    }

}
