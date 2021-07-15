const { response } = require('express');
const usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const usuarioDB = await usuario.findOne({ email }); // Buscamos un usuario por el email

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
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}