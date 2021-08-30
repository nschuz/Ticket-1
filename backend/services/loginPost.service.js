const bcrypt = require('bcrypt');
const { Usuario } = require('../models/Usuario');
const { crearJWT } = require('../services/crearJWT.service');


const loginPost = (email, password, req, res) => {
    const usuario = await Usuario.findOne({ where: { email } });


    if (!usuario) {
        return res.status(400).json('Usuario/Password erroneo')
    }

    //verificamos el password sea correcto 
    //validar password 
    const passwordDB = usuario.dataValues.password;
    const passwordCorecto = bcrypt.compareSync(password, passwordDB);
    console.log("password ", passwordCorecto);
    if (!passwordCorecto) {
        return res.status(400).json('Usuario/Password erroneos')
    }
    const token = await crearJWT(usuario.dataValues.id_unico);
    res.cookie('token', token).redirect('/it/home');
}
module.exports = {
    loginPost
}