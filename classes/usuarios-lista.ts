import { Usuario } from './usuario';

export class UsuarioLista {

    private lista: Usuario[] = [];

    constructor() {}

    // Agregar un usuario
    public agregar( usuario: Usuario ) {

        this.lista.push( usuario );

        return usuario;

    }

    // Agregar un usuario
    public actualizarNombre( id: string, nombre: string ) {

        for( let usuario of this.lista ) {

            if( usuario.id === id ) {
                usuario.nombre =  nombre;
                break;
            }

        }

    }

    // Obtener lista de usuario
    public getLista() {

        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre' );

    }

    // Obtener un usuario
    public getUsuario( id: string ) {

        return this.lista.find( usuario => usuario.id === id );

    }

    // Obtener usuarios en una sala en particular
    public getUsuariosEnSala( sala: string ) {

        return this.lista.filter( usuario => usuario.sala === sala );

    }

    // Borrar Usuario
    public borrarUsuario( id: string ) {

        const tempUsuario = this.getUsuario( id );

        this.lista = this.lista.filter( usuario => usuario.id !== id );

        return tempUsuario;
        
    }

}