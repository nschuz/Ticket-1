const express = require('express')
let cors = require('cors')
const sequelize = require("./db/conexion");
const { Usuario } = require('./models/Usuario');
const { apiLimiter } = require('./middlewares/apiLimiter');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { Presupueto } = require('./models/Presupuesto');
const { CostoAdministrativo } = require('./models/CostoAdministrativo');
const { CostoDirecto } = require('./models/CostoDirecto');
const { FlujoAdminsitativo } = require('./models/FlujoEfectivo');
const { Ingreso } = require('./models/Ingresos');



class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/it';

        this.app.set('views', path.join(__dirname, '/views'));
        console.log(path.join(__dirname, '/views'));
        this.app.set('view engine', 'hbs');



        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();

        //conectar DBAZURE
        this.conectarDB();

    }



    middlewares() {

        //Cors
        this.app.use(cors())

        //Middleware Public
        this.app.use(express.static(path.join(__dirname, 'public')))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
        //express-rate-limit
        this.app.use(apiLimiter)
        this.app.use(morgan('combined'))
            //CookieParser
        this.app.use(cookieParser());
    }

    async conectarDB() {
        try {
            await sequelize.authenticate();
            console.log('Conexion con la base de datos establecida');
            await sequelize.sync();
            //await sequelize.models.User.sync({ force: true });
            // await Contacto.sync();
            await Presupueto.sync();
            await CostoAdministrativo.sync();
            await CostoDirecto.sync();
            await FlujoAdminsitativo.sync();
            await Ingreso.sync();
            CostoAdministrativo.belongsTo(Presupueto, { foreignKey: 'id_presupuesto' })
            CostoDirecto.belongsTo(Presupueto, { foreignKey: 'id_presupuesto' })
            FlujoAdminsitativo.belongsTo(Presupueto, { foreignKey: 'id_presupuesto' })
            Ingreso.belongsTo(Presupueto, { foreignKey: 'id_presupuesto' })
            console.log("Todos los modelos fueron sincronizados correctamente");
        } catch (error) {
            console.error('Problema al conectrase o al sicronizar modelos', error);
        }
    }

    routes() {

        //otro tipo de middl configuramos el router
        this.app.use(this.usuariosPath, require('./routes/usuarios'));
        this.app.use(this.usuariosPath, require('./routes/aplication'));
        this.app.use(this.usuariosPath, require('./routes/presupuesto'));


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en : ", this.port)
        })
    }

}

module.exports = Server;
//