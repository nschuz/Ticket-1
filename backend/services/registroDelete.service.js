const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { Usuario } = require('../models/Usuario');


const deleteUser = async(id, req, res) => {
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
    deleteUser
}