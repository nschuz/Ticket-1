const { loginPostService } = require('../services/loginPost.service');
const { registroUser } = require('../services/registro.service');
const { deleteUser } = require('../services/registroDelete.service');



const loginGet = (req, res) => {
    res.render('login');
}

const loginPost = async(req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    loginPostService(email, password, req, res);
}


const registroPost = async(req, res) => {
    const { nombre, apellido, email, password } = req.body;
    registroUser(nombre, apellido, email, password, req, res);
}

const regsitroDelete = async(req, res) => {
    const { id } = req.body;
    deleteUser(id, req, res);
}



module.exports = {
    loginGet,
    registroPost,
    regsitroDelete,
    loginPost
}