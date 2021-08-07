const Sequelize = require("sequelize");
require('dotenv').config({ path: '../dev.env' })

let sequelize;


try {
    // sequelize = new Sequelize(process.env.DBAZURE, process.env.USERAZURE, process.env.PASSAZURE, {
    //     //host: process.env.HOST,
    //     host: process.env.HOSTAZURE,
    //     dialect: process.env.dialect,
    //     pool: {
    //         max: 5,
    //         min: 0,
    //         idle: 10000
    //     },
    //     dialectOptions: {
    //         encrypt: true
    //     }
    // });

    sequelize = new Sequelize('Ticket1', 'teclaadmin', 'root123$', {
        //host: process.env.HOST,
        host: 'tecla.database.windows.net',
        dialect: 'mssql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000

        },
        dialectOptions: {
            encrypt: true
        }
    });

    console.log("Conexion a la base de datos correcta");
} catch (e) {
    console.log("Problema en la conexion" + e);
}



module.exports = sequelize;