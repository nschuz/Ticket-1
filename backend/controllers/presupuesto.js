const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { crearJWT } = require('../services/crearJWT.service');
const jwt = require('jsonwebtoken');
const { Presupueto } = require('../models/Presupuesto');


const presupuestosGet = async(req, res) => {
    try {
        const presupuestos = await Presupueto.findAll();
        res.status(200).json(presupuestos);
    } catch (e) {
        res.status(400).json('Problema al solicitar tu peticion');
        console.log(e);
    }

}

const presupuestoPost = async(req, res) => {
    const { nombre, version, descripcion } = req.body;
    try {
        //Guardamos en la base de datos al usuario
        const presupuesto = await Presupueto.create({
            nombre,
            version,
            descripcion
        })
        res.status(200).json("presupuesto creado")
    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }
}

const presupuestoDelete = async(req, res) => {
    const { id } = req.params;
    try {
        const activo = await Presupueto.findAll({ where: { id_presupuesto: id, } });
        console.log(activo);

        if (!activo[0].dataValues.activo) {
            return res.status(400).json("Contacte al administrador") //no se puede borrar un usuario inactivo
        }

        Presupueto.update({ activo: false }, { where: { id_presupuesto: id } });
        res.status(200).json("Datos actualizados");
    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }
}

const presupuestoPut = async(req, res) => {
    const { nombre, fecha, descripcion, version, estado } = req.body;
    const { id } = req.params;


    const activo = await Presupueto.findAll({ where: { id_presupuesto: id } });

    // if (!activo[0].dataValues.activo) {
    //     return res.status(400).json("No se puede actualizar un usuario inabilatado") //no se puede borrar un usuario inactivo
    // }


    try {
        let nombreHas = '',
            fechaHas = '',
            descripcionHas = '',
            versionHas = '',
            estadoHas = '';


        if (!descripcion) {
            descripcionHas = activo[0].dataValues.descripcion;
        } else {
            descripcionHas = descripcion;
        }
        if (!nombre) {
            nombreHas = activo[0].dataValues.nombre;
        } else {
            nombreHas = nombre;
        }
        if (!fecha) {
            fechaHas = activo[0].dataValues.fecha_creacion;
        } else {
            fechaHas = fecha;
        }
        if (!version) {
            versionHas = activo[0].dataValues.version;
        } else {
            versionHas = version;
        }
        if (!estado) {
            estadoHas = activo[0].dataValues.activo;
        } else {
            estadoHas = estado;
        }





        Presupueto.update({ nombre: nombreHas, descripcion: descripcionHas, version: versionHas, fecha_creacion: fechaHas, activo: estadoHas }, { where: { id_presupuesto: id } });
        res.status(200).json("Datos actaulizados");
    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }


}


module.exports = {
    presupuestosGet,
    presupuestoPost,
    presupuestoDelete,
    presupuestoPut,

}