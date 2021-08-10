const { Sequelize } = require('sequelize');
const sequelize = require('../db/conexion');
const { Presupueto } = require('./Presupuesto');



const CostoDirecto = sequelize.define("costoDirecto", {
    costo_directo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    concepto: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    concepto_directo: {
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
    CostoDirecto
};