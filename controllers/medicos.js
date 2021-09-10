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

const getMedicoById = async( req, res=response ) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById( id )
                                    .populate( 'usuario', 'nombre img' )
                                    .populate( 'hospital', 'nombre img')
    
    
        res.json({
            ok:true,
            medico
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
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

const actualizarMedico = async( req, res=response ) => {

    const id = req.params.id;   // La id del médico que queremos actualizar viene en los params
    const uid = req.uid         // El uid de la persona que actualiza viene del token a través de validarJWT de las rutas de actualizar medicos

    try {
        
        const medico = await Medico.findById( id ); // Buscamos el medico por id

        if( !medico ){                                // Sino existe msg de error
            return res.status(404).json({
                ok:true,
                msg: 'Medico no encontrado'
            })
        }

        const cambiosMedico = { 
            ...req.body,            // Cambios en el nombre y hospital del medico
            usuario: uid            // Usuario que ha realizado los cambios
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true } ); // Actualización en Bd

        res.json({
            ok:true,
            medico: medicoActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarMedico = async( req, res=response ) => {

    const id = req.params.id;   // La id del medico viene en los params

    try {
        
        const medico = await Medico.findById( id ); // Buscamos el medico por id

        if( !medico ){                                // Sino existe msg de error
            return res.status(404).json({
                ok:true,
                msg: 'Médico no encontrado'
            })
        }

        await Medico.findByIdAndDelete ( id );

        res.json({
            ok:true,
            msg: 'Médico borrado'
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


module.exports = { 
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
}