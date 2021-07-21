const { Router } = require('express');
const { check } = require('express-validator');
const expressFileUpload = require('express-fileupload');

const { fileUpload, retornaImagen } = require('../controllers/upload');
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');


const router = Router();
router.use(expressFileUpload());                    // Permite atrapar el archivo a subir

/* Ruta /api/upload */

router.put( '/:tipo/:id',                           // tipo puede ser medico, usuario u hospital // id es el id del documento que queremos actualizar
    [
       validarJWT, // req.uid = uid;
       check('tipo', 'El tipo de la actualización es necesario').not().isEmpty(),
       validarCampos                                                
    ],
    fileUpload );

router.get( '/:tipo/:foto',                           // tipo puede ser medico, usuario u hospital // foto es el nombre de la imagen que queremos actualizar
    [
       validarJWT, // req.uid = uid;
       check('tipo', 'El tipo de la actualización es necesario').not().isEmpty(),
       validarCampos                                                
    ],
    retornaImagen );


module.exports = router;