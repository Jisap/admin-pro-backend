

const getMenuFrontEnd = ( role = 'USER_ROLE' ) => {

    const menu = [    
        {
        titulo: 'Dashboard',
        icono: 'mdi mdi-gauge',
        submenu:[
            { titulo: 'Main', url:'/' },
            { titulo: 'ProgressBar', url:'progress' },
            { titulo: 'Gráficas', url: 'grafica1' },
            { titulo: 'Promesas', url: 'promesas'},
            { titulo: 'rxjs', url: 'rxjs' }
        ]
        },
        {
        titulo: 'Mantenimiento',
        icono: 'mdi mdi-folder-lock-open',
        submenu: [
            //{ titulo: 'Usuarios', url: 'usuarios' },          //Si no es un administrador no podrá ver esta ruta
            { titulo: 'Hospitales', url: 'hospitales' },
            { titulo: 'Medicos', url: 'medicos' },
        ]
        },
    ];

    if( role === 'ADMIN_ROLE'){                                            // Si cumple el role se inserta en la 1ª 
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' })   // posición del 2º {} el mantenimiento de usuarios 
    }

    return menu;
}

module.exports = { getMenuFrontEnd };