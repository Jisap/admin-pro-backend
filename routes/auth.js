const { Router } = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');

const router = Router();

/* Ruta /api/login */

router.post( '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
)

/* Ruta /api/login/google */

router.post( '/google', 
    [
        check('token', 'El token de google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
)

/* Ruta /api/login/renew */

router.get( '/renew', 
    validarJWT,
    renewToken
)

module.exports = router;