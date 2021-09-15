const jwt = require('jsonwebtoken');

const validarJWT = ( req, res, next ) => {                         // Este midleware verfica la integridad del token que viene en la petición. 
                                                                   // Sea cual sea la petición llevará el token del usuario que la realiza.
    //Leer el token de los headers en
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET ); // Extraemos y verificamos el uid del token de los headers
        req.uid = uid;                                               // Lo introducimos en la petición y pasaria al siguiente middleware
        next();                                                      // Si todo fuese bien pasariamos al next().

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no válido'
        });
    }

}

module.exports = validarJWT
