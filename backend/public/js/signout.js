class CerrarSesion {

    constructor() {


    }
    cerrarSesion() {
        document.cookie = 'token' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        window.location.replace('/it/login')
    }


}
//cerrarSesion
window.onload = function() {
    const boton1 = document.querySelector('#cerrarSesion');
    const boton2 = document.querySelector('#cerrarSesion');

    boton1.addEventListener('click', signout.cerrarSesion);
    boton2.addEventListener('click', signout.cerrarSesion);


}

const signout = new CerrarSesion();