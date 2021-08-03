const jwt = require('jsonwebtoken')
require('dotenv').config()

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {

        //verificar solo el uid
        const payload = { uid };
        jwt.sign(payload, 'secretkey', {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token)
            }

        })

    })
}



module.exports = {
    generarJWT
}