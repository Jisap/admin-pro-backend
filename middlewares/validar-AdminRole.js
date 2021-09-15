const Usuario = require('../models/usuario');


const validarADMIN_ROLE = async( req, res, next ) => {          // Este midleware determina si el usuario que actualiza tiene el role de admin

    const uid = req.uid;                                        // El uid se introdujo en la req en el anterior middleware (validar-jwt)
        
    try {
        
        const usuarioDB = await Usuario.findById( uid );        // Determinamos cual es el usuario en la bd según el uid
        
        if( !usuarioDB ){                                       // Sino existe el usuario en bd msg de error
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if( usuarioDB.role !== 'ADMIN_ROLE' ){                  // Si el role del usuario que quiere actualizar no es admin_role
            return res.status(403).json({                       // msg de error.
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }

        next();                                                  // Si todo fuese bien pasariamos al next().

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

module.exports = validarADMIN_ROLE