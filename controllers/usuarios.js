const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async( req, res ) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok:true,
        usuarios,
        uid: req.uid    // Podriamos poner el uid de la persona que hizo la petición getUsuarios
                        // Al validar el JWT en la ruta, el uid se introdujo en la req
    });
}

const crearUsuario = async( req, res=response ) => {

    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });
        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario( req.body );

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        const token = await generarJWT( usuario.id )

    
        res.json({
            ok:true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado.. revisar logs'
        })
    }

}

const actualizarUsuario = async( req, res=response ) => {
    
    //TODO Validar token y comprobar si el usuario es el correcto

    const uid = req.params.id;                                        // el uid viene en la url como params

    try {

        const usuarioDB = await Usuario.findById( uid );              // Buscamos el usuario en la bd por el uid   
        
        if( !usuarioDB ){                                             // Si no existe
            return res.status(404).json({                             // mensaje de error.  
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        const { password, google, email, ...campos } = req.body;      // Si el usuario existe obtenemos los nombres de los campos del body
                                                                      // Desestructuramos y dejamos fuera lo que no queremos actualizar o comprobar  
                                               
        if( usuarioDB.email !== email ){                              // Si el email de la bd != al del body, el email se quiere actualizar
                                                                
            const existeEmail = await Usuario.findOne({ email: req.body.email }); // Buscamos un usuario cuyo email coincida con el del body
                if( existeEmail ){                                                // Si usuario ya existía  
                    return res.status(400).json({                                 // Mensaje de error
                        ok:false,
                        msg:'Ya existe un usuario con ese email'
                    })
                }
        } 

        campos.email = email;                                                     // Metemos en campos el valor del nuevo email      

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new:true } ); // Actualizamos el usuario con los campos a renovar.

        res.json({
            ok:true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuario = async( req, res=response ) => {

    const uid = req.params.id;

    try {
        
        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){                                             // Si no existe
            return res.status(404).json({                             // mensaje de error.  
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok:true,
            msg: 'Usuario eliminado' 
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
    }

}



module.exports = { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario }