import { Marcador } from './marcador';

export class Mapa {

    private marcadores: { [key: string]: Marcador } = {
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

    constructor() {}

    getMarcadores() {
        return this.marcadores;
    }

    borrarMarcador( id: string ) {

        delete this.marcadores[id];
        return this.getMarcadores();

    }

    agregarMarcador( marcador: Marcador ) {
      this.marcadores[ marcador.id ] = marcador;
    }

    moverMarcador( marcador: Marcador ) {

        this.marcadores[marcador.id].lng = marcador.lng;
        this.marcadores[marcador.id].lat = marcador.lat;

    }

}