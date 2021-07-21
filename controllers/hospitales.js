const  { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitales = async( req, res=response ) => {

    const hospitales = await Hospital.find()
                                .populate( 'usuario', 'nombre img' )


    res.json({
        ok:true,
        hospitales
    })
}

const crearHospital = async( req, res=response ) => {

    const uid = req.uid;                                    // Extraemos UID de la req (Introducido en la req por validarJWT)
    
    const hospital = new Hospital( {                        // Creamos la nueva instancia de hospital y le añadimos el uid en usuario
        usuario: uid,
        ...req.body,
    } );

    try {
        
        const hospitalDB = await hospital.save();           // Grabamos en BD

        res.json({                                          // Respuesta json
            ok:true,
            hospital: hospitalDB
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarHospital = ( req, res=response ) => {

    res.json({
        ok:true,
        msg: 'actualizarHospital'
    })
}

const borrarHospital = ( req, res=response ) => {

    res.json({
        ok:true,
        msg: 'borrarHospital'
    })
}


module.exports = { 
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}