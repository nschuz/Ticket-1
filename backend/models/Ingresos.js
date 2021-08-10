const { Sequelize } = require('sequelize');
const sequelize = require('../db/conexion');
const { Presupueto } = require('./Presupuesto');



const Ingreso = sequelize.define("ingreso", {
    id_ingreso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },

    concepto: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    concept_ingreso: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: 0.00,
    },
    id_presupuesto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            // Modelo de referencia
            model: Presupueto,
            // Nombre de la columna de referencia
            key: 'id_presupuesto',
        }
    }

});


module.exports = {
    Ingreso
};