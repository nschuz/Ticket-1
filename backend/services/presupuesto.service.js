const presupuestoPut = (nombre, fecha, descripcion, version, estado, id, req, res) => {

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
    presupuestoPut
}