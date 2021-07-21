const fs = require('fs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = ( path ) => {
   
            if( fs.existsSync( path )){
                fs.unlinkSync( path );
            }
};

const actualizarImagen = async( tipo, id, nombreArchivo ) => {

    let pathviejo='';

    switch( tipo) {

        case 'medicos':
            const medico = await Medico.findById( id );                 // Se busca el medico a actualizar según id
            if( !medico ){
                console.log('No existe un médico con ese id');
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;           // Borramos el archivo que queremos actualizar
            borrarImagen( pathViejo );
            

            medico.img = nombreArchivo;                                 // Asignamos en el modelo la nueva imagen
            await medico.save();                                        // Grabamos en BD.
            return true;

        case 'hospitales':
            const hospital = await Hospital.findById( id );                 // Se busca el hospital a actualizar según id
            if( !hospital ){
                console.log('No existe un hospital con ese id');
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;      // Borramos el archivo que queremos actualizar
            borrarImagen( pathViejo );
            

            hospital.img = nombreArchivo;                                 // Asignamos en el modelo la nueva imagen
            await hospital.save();                                        // Grabamos en BD.
            return true;
            

        case 'usuarios':
            const usuario = await Usuario.findById( id );                 // Se busca el usuario a actualizar según id
            if( !usuario ){
                console.log('No existe un usuario con ese id');
                return false;
            }

            pathViejo = `./uploads/medicos/${ usuario.img }`;      // Borramos el archivo que queremos actualizar
            borrarImagen( pathViejo );
            

            usuario.img = nombreArchivo;                                 // Asignamos en el modelo la nueva imagen
            await usuario.save();                                        // Grabamos en BD.
            return true;
        
    }

}

module.exports = { actualizarImagen }