const Usuario = require('../models/usuario');


const validarADMIN_ROLE_o_MismoUsuario = async( req, res, next ) => {          // Este midleware determina si el usuario que actualiza tiene el role de admin

    const uid = req.uid;                                        // El uid se introdujo en la req en el anterior middleware (validar-jwt)
    const id = req.params.id;                                   // Determinamos el id del usuario que queremos actualizar

    try {
        
        const usuarioDB = await Usuario.findById( uid );        // Determinamos cual es el usuario en la bd según el uid
        
        if( !usuarioDB ){                                       // Sino existe el usuario en bd msg de error
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        // Opcion 1

        // if( usuarioDB.role !== 'ADMIN_ROLE' && uid !== id ){    // Si el role del usuario que quiere actualizar no es admin_role
        //     return res.status(403).json({                       // y ese usuario es diferente del usuario que vamos a actualizar
        //         ok: false,                                      // msg de error.
        //         msg: 'No tiene privilegios para hacer eso'
        //     });
        // }

        // next();                                                 // Si todo fuese bien pasariamos al next().

        // Opcion 2
        
        if( usuarioDB.role === 'ADMIN_ROLE' || uid ===id){         // Si el role del usuario que quiere actualizar es admin
                                                                   // o el id de ese usuario = id del que se quiere actualizar 
            next();                                                // Se permite pasar al siguiente midleware
        }else{
             return res.status(403).json({                         // Sino msg de error
                 ok: false,                                      
                 msg: 'No tiene privilegios para hacer eso'
             });
        }



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

module.exports = validarADMIN_ROLE_o_MismoUsuario