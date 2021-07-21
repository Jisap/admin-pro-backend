const { Router } = require('express');
const { check } = require('express-validator');

const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');

const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');

const router = Router();

/* Ruta /api/todo */

router.get( '/:busqueda', 
    [
       validarJWT, // req.uid = uid;
       check('busqueda', 'El termino de la busqueda es necesario').not().isEmpty(),
       validarCampos                                                
    ],
    getTodo );

router.get( '/coleccion/:tabla/:busqueda', 
    [
       validarJWT, // req.uid = uid;
       check('busqueda', 'El termino de la busqueda es necesario').not().isEmpty(),
       validarCampos                                                
    ],
    getDocumentosColeccion
)

module.exports = router;