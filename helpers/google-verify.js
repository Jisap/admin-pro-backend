


const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client( process.env.CLIENT_ID ); // Identificador de mi aplicación


const googleVerify = async( token ) => {

  const ticket = await client.verifyIdToken({ // Verificamos que el token generado por google sea válido, si es así se genera un ticket.
      idToken: token,                         // La función de verificación de google necesita el token y el secreto de las credenciales.  
      audience: process.env.CLIENT_ID,  
  });

  const payload = ticket.getPayload();        // si todo va bien se genera un payload o carga útil.  
                                              // De ese payload se obtiene un name, email y un picture para el frontend  

  const { name, email, picture } = payload;

  return { name, email, picture };

}

module.exports = { 
    googleVerify
};