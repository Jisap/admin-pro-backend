const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const usuarioDB = await Usuario.findOne({ email }); // Buscamos un usuario por el email

        // Verificar email
        if(!usuarioDB) {
            return res.status(404).json({ 
                ok:false,
                masg:'Email no encontrado'
            });
        }

        // Verificar password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if(!validPassword) {
            return res.status(400).json({ 
                ok: false,
                msg:'Password incorrect'
            });
        }

        // Generar el token
        const token = await generarJWT( usuarioDB.id )

        res.json({
            ok: true,
            msg: 'login successful',
            token,
            menu: getMenuFrontEnd( usuarioDB.role )
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignIn = async ( req, res=response ) => {

    const googleToken =req.body.token;                          // Recuperamos el token del body, este token lo ha generado el frontend (public.html)

    try {
        
        const { name, email, picture } = await googleVerify( googleToken );                  // Verificamos su validez
        
        const usuarioDB = await Usuario.findOne({ email });         // Buscamos un usuario en bd según un email generado por google
        let usuario;
    
        if( !usuarioDB ){                                           // Si no existe ese usuario 
            usuario = new Usuario({                                 // creamos uno nuevo
                nombre: name,
                email, 
                password: '@@@',
                img: picture,
                google: true
            });
        }else{                                                      // Pero si si existe
            usuario = usuarioDB;                                    // usuario será igual al usuario de bd
            usuario.google = true;
        }

        await usuario.save();                                       // Grabamos en bd el usuario encontrado

        const token = await generarJWT( usuario.id );               // Generamos el token

        res.json({
            ok:true,
            msg: 'Google Signin',
            token,
            menu: getMenuFrontEnd( usuario.role )
        });

    } catch (error) {
        
        res.status( 401 ).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }
}

const renewToken = async( req, res=response ) => {

    const uid = req.uid                                 // En los headers ponemos el token a renovar -> routes/auth -> validarJWT -> req.uid = uid 

    const usuario = await Usuario.findById( uid );      // buscamos el usuario según ese uid

    const token = await generarJWT( uid );              // Generamos un nuevo token con ese uid

    res.json({
        ok: true,
        token,                                           // Devolvemos ese token  y el usuario en la res.
        usuario,
        menu: getMenuFrontEnd( usuario.role )
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}