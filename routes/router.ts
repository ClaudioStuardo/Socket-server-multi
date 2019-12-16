import { Router, Request, Response }  from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';
import { EncuestaData } from '../classes/encuesta';
import { GraficaData } from '../classes/grafica';
import { MapaGoogle } from '../classes/mapa-google';
import { Mapa } from '../classes/mapa';

const router = Router();
const grafica = new GraficaData();
const encuesta = new EncuestaData();
const mapa = new Mapa();
export const mapaGoogle = new MapaGoogle();
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
mapaGoogle.marcadores.push( ...lugares );

router.get('/mapa-google', (req: Request, res: Response) => {

    res.json( mapaGoogle.getMarcadores() );

});

router.get('/mapa', (req: Request, res: Response) => {

    res.json( mapa.getMarcadores() );

});

router.get('/encuesta', (req: Request, res: Response) => {

    res.json( encuesta.getDataGrafica() );

});

router.post('/encuesta', (req: Request, res: Response) => {

    const opcion = Number(req.body.opcion);
    const valores = Number(req.body.valores);

    encuesta.editarValor( opcion, valores );

    const server = Server.instance;
    server.io.emit('cambio-encuesta', encuesta.getDataGrafica());

    res.json( encuesta.getDataGrafica() );

});

router.get('/grafica', (req: Request, res: Response) => {

    res.json( grafica.getDataGrafica() );

});

router.post('/grafica', (req: Request, res: Response) => {

    const mes = req.body.mes;
    const unidades = Number(req.body.unidades);

    grafica.editarValor( mes, unidades );

    const server = Server.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica());

    res.json( grafica.getDataGrafica() );

});

router.get('/mensajes', (req: Request, res: Response) => {

    res.json({
        ok: true,
        mensaje: 'GET-LISTO'
    });

});

router.post('/mensajes', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de, 
        cuerpo
    }
    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo,
        de
    });

});

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de, 
        cuerpo
    }
    const server = Server.instance;

    server.io.in( id ).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});

// Servicio para obtener todos los IDs de todos los usuarios
router.get('/usuarios', (req: Request, res: Response) => {

    const server = Server.instance;
    server.io.clients( (err: any, clientes: string[]) => {

        if ( err ) {
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
router.get('/usuarios/detalle', (req: Request, res: Response) => {

    const server = Server.instance;
    server.io.clients( (err: any, clientes: string[]) => {

        if ( err ) {
            res.json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            clientes: usuariosConectados.getLista()
        });

    });

});


export default router;
