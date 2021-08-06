const btnAgregarFlujo = document.querySelector('#agregarFlujo');
const inputMes = document.querySelector('#mes');
const inputAnio = document.querySelector('#anio');
const btnAgregear = document.querySelector('#borrar');
const btnEliminar = document.querySelector('#eliminar');
const bntBorrarTitulo = document.querySelector('#borrarTitulo');
const data = document.querySelectorAll('.data');
const tbody = document.querySelectorAll('.tbody');






window.onload = function() {
    btnAgregear.addEventListener('click', agregarFlujo);
    bntBorrarTitulo.addEventListener('click', borrarTitulo);
}

function agregarFlujo() {
    console.log(inputMes.value);
    console.log(inputAnio.value);
    const anio = inputAnio.value;
    const mes = inputMes.value;
    if (inputAnio.value === '' || inputMes.value === '') {
        ui.alerta("Los campos  son obligatorios", "error")
        return;
    }

    if (!(parseInt(mes) >= 1 && parseInt(mes) <= 12)) {
        ui.alerta("Mes invalido o Año invalido", "error");
        return;
    }
    if (anio.length <= 3) {
        ui.alerta("Mes invalido o Año invalido", "error");
        return;
    }

    //ui.alerta("campos agregados", "success");
    ui.insertarPeriodo(inputMes.value, inputAnio.value);
}


function borrarTitulo() {
    ui.borrarTitulo();
}



class UI {

    constructor() {

    }
    alerta(message, error) {
        const mensaje = document.createElement("div");
        mensaje.classList.add('alert');
        if (error === "error") {
            mensaje.classList.add('alert-danger');
        } else {
            mensaje.classList.add('alert-success');
        }
        mensaje.textContent = message;

        //agegar al dom
        //Agregar al dom
        if (!document.querySelector('.alert')) {
            document.querySelector('#alerta').appendChild(mensaje);
        }

        //Quitar la laerta despues de 5 segundos 
        setTimeout(() => {
            mensaje.remove();
        }, 2500);
    }
    insertarPeriodo(mes, anio) {
        const { mesNuevo, anioNuevo } = this.validarFecha(mes, anio);
        const tabletr = document.querySelectorAll('.tabletr');
        const sumatoria = document.querySelectorAll('.sumatoria');
        console.log(sumatoria)
        console.log(tabletr)

        let i = 0;
        while (i < tabletr.length) {
            //const th = tabletr[i].insertCell(2);
            const th = document.createElement('th')
            th.setAttribute('scope', 'col')
            th.setAttribute('class', `${mesNuevo}${anioNuevo}`)
            th.setAttribute('name', `${mesNuevo}${anioNuevo}`)
            th.textContent = `${mesNuevo}/${anioNuevo}`;
            tabletr[i].insertBefore(th, sumatoria[i]);
            const hijos = Array.from(tbody[i].children);

            for (let j = 0; j < hijos.length; j++) {
                const td = document.createElement("td");
                td.textContent = 0;
                hijos[j].appendChild(td);
            }


            i++;
        }
        this.alerta("Periodo creado", "success");
    }

    validarFecha(mes, anio) {
        //validamos si la fecha es correcta o no esta reprtida
        console.log("messss", mes);
        const elemento = document.getElementsByClassName(`${mes}${anio}`);
        console.log(elemento.length)

        if (elemento.length > 0) {
            console.log("error")
            this.alerta("No puedes insertar un periodo igual", "error");
            return;
        }

        // if (mes == '12') {
        //     mes = '1';
        // }



        return { mesNuevo: mes, anioNuevo: anio };
    }

    borrarTitulo() {
        const tabletr = document.querySelectorAll('.tabletr');
        const sumatoria = document.querySelectorAll('.sumatoria');
        for (let i = 0; i < tabletr.length; i++) {
            let elementos = Array.from(tabletr[i].children);
            tabletr[i].removeChild(elementos[elementos.length - 2]);
        }
    }

}

class Termino {

    constructor(mes, anio) {
        this.mes = mes;
        this.anio = anio;
    }



}
const ui = new UI();
const termino = new Termino();