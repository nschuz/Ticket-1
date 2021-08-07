const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { Usuario } = require('../models/Usuario');
const { crearJWT } = require('../services/crearJWT.service');
const jwt = require('jsonwebtoken')



const loginGet = (req, res) => {
    res.render('login');
}

const loginPost = async(req, res) => {
    const { email, password } = req.body;
    //verificamos el correo exista 
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
    // const isAdmin = usuario.dataValues.tipo_usuario;
    ///loged = true;

    // if (isAdmin == "admin") {
    //     res.cookie('token', token).redirect('/tienda/admin')
    // } else {
    //     res.cookie('token', token).redirect('/tienda/user')
    // }
}


const registroPost = async(req, res) => {
    const { nombre, apellido, email, password } = req.body;
    try {

        //ciframos la contraseña
        const passHas = await bcrypt.hash(password, 10);

        //Guardamos en la base de datos al usuario
        const usuario = await Usuario.create({
            id_unico: uuidv4(),
            nombre,
            apellido,
            password: passHas,
            email,
        })

        delete password;

        // res.status(200).redirect('/tienda/login');
        res.status(200).json("usuario creado")

    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }
}

const regsitroDelete = async(req, res) => {
    const { id } = req.body;

    const activo = await Usuario.findAll({ where: { id_unico: id, } });
    console.log(activo);

    if (!activo[0].dataValues.activo) {
        return res.status(400).json("Contacte al administrador") //no se puede borrar un usuario inactivo
    }

    try {
        Usuario.update({ activo: false }, { where: { id_unico: id } });
        res.status(200).json("Datos actaulizados");
    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }
}

module.exports = {
    loginGet,
    registroPost,
    regsitroDelete,
    loginPost
}