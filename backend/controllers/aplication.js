const homeGet = (req, res) => {
    res.render('home');
}

const presupuestoGet = (req, res) => {
    res.render('presupuesto');
}

module.exports = {
    homeGet,
    presupuestoGet,
}