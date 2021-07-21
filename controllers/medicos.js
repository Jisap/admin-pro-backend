const  { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async( req, res=response ) => {

    const medicos = await Medico.find()
                                .populate( 'usuario', 'nombre img' )
                                .populate( 'hospital', 'nombre img')


    res.json({
        ok:true,
        medicos
    })
}

const crearMedico = async( req, res=response ) => {

    const uid = req.uid;                                // Extraemos UID de la req (Introducido en la req por validarJWT)
    
    const medico = new Medico( {                        // Creamos la nueva instancia de hospital y le añadimos el uid en usuario
        usuario: uid,
        ...req.body,
    } );

    try {
        
        const medicoDB = await medico.save();           // Grabamos en BD

        res.json({                                      // Respuesta json
            ok:true,
            medico: medicoDB,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const actualizarMedico = ( req, res=response ) => {

    res.json({
        ok:true,
        msg: 'actualizarMedico'
    })
}

const borrarMedico = ( req, res=response ) => {

    res.json({
        ok:true,
        msg: 'borrarMedico'
    })
}


module.exports = { 
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}