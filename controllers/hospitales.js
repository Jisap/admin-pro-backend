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

const actualizarHospital = async( req, res=response ) => {

    const id = req.params.id;   // La id del hospital viene en los params
    const uid = req.uid         // El uid viene del token a través de validarJWT en las rutas de actualizar hospitales

    try {
        
        const hospital = await Hospital.findById( id ); // Buscamos el hospital por id

        if( !hospital ){                                // Sino existe msg de error
            return res.status(404).json({
                ok:true,
                msg: 'Hospital no encontrado'
            })
        }

        const cambiosHospital = { 
            ...req.body,            // Cambios en el nombre del hospitales
            usuario: uid            // Usuario que ha realizado los cambios
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true } ); // Actualización en Bd

        res.json({
            ok:true,
            hospital: hospitalActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarHospital = async( req, res=response ) => {

    const id = req.params.id;   // La id del hospital viene en los params

    try {
        
        const hospital = await Hospital.findById( id ); // Buscamos el hospital por id

        if( !hospital ){                                // Sino existe msg de error
            return res.status(404).json({
                ok:true,
                msg: 'Hospital no encontrado'
            })
        }

        await Hospital.findByIdAndDelete ( id );

        res.json({
            ok:true,
            msg: 'Hospital eliminado'
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


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