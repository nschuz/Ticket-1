const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { Usuario } = require('../models/Usuario');


const login = (req, res) => {
    res.render('login');
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
    login,
    registroPost,
    regsitroDelete
}