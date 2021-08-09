const jwt = require('jsonwebtoken')
const { Usuario } = require('../models/Usuario');
const { UsuarioDTO, LoginDTO } = require("../dto/usuario/usuario.dto");
const Joi = require('joi');

module.exports.checkDatosAlta = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, UsuarioDTO, "Los datos enviados no son correctos")
        return next();
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}
module.exports.checkLogin = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, LoginDTO, "Los datos enviados no son correctos")
        return next();
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}



module.exports.validarJWT = async(req = request, res = response, next) => {
    //leer los header
    const token2 = req.cookies.token;
    //const token = req.header('acces-token');
    console.log(token2);

    if (!token2) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const { uid } = jwt.verify(token2, 'secretkey')
            //ller el usuario que corresponda al uid
        const usuario = await Usuario.findOne({ where: { id_unico: uid } })
        req.usuario = usuario;
        next();

    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token no valido'
        })

    }

}

module.exports.tokenActivo = async(req, res, next) => {
    //leer los header
    const token2 = req.cookies.token;
    //const token = req.header('acces-token');
    console.log(token2);

    if (!token2) {
        return next();
    }

    try {
        const { uid } = jwt.verify(token2, 'secretkey')
            //ller el usuario que corresponda al uid
        const usuario = await Usuario.findOne({ where: { id_unico: uid } })
        req.usuario = usuario;
        if (!usuario) {
            next();
        } else {
            res.redirect('/it/home');
        }

    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token no valido'
        })

    }
}