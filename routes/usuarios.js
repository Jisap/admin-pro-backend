const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');



const router = Router();

/* Ruta /api/usuarios */

router.get( '/', validarJWT ,getUsuarios );

router.post( '/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password','La password es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),                // Si alguno de los checks recoge un error --> validationResults
        validarCampos,                                                      // validarCampos contiene ese validationResult y nos lo mostrará en la res                                                
    ],
    crearUsuario );

router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ] 
    ,actualizarUsuario );

router.delete( '/:id',
    validarJWT,
     borrarUsuario );

module.exports = router;