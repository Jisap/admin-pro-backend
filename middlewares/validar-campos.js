const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = ( req, res=response, next ) => {

    const errores = validationResult( req );                // Definimos los errores si los hay
    if( !errores.isEmpty() ){                               // Si hay errores
        return res.status(400).json({                       // Mensaje de error con la descripción de los errores
            ok:false,
            errors: errores.mapped()
        });
    }

    next();     // Sino hay errores pasa a la siguiente validación

}

module.exports = validarCampos;