const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { Usuario } = require('../models/Usuario');



const registroUser = async(nombre, apellido, email, password, req, res) => {

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

module.exports = {
    registroUser
}