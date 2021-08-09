const { Sequelize } = require('sequelize');
const sequelize = require('../db/conexion')



const Presupueto = sequelize.define("presupuesto", {
    id_presupuesto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    fecha_creacion: {
        type: Sequelize.DATE,
        allowNull: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false
    },

    version: {
        type: Sequelize.STRING,
        allowNull: false
    },
    activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },


});


module.exports = {
    Presupueto
};