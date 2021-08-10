const { Sequelize } = require('sequelize');
const sequelize = require('../db/conexion');
const { Presupueto } = require('./Presupuesto');



const FlujoAdminsitativo = sequelize.define("flujoAdminsitativo", {
    flujo_administativo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ingresos: {
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
    FlujoAdminsitativo
};