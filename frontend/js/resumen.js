const btnAgregarFlujo = document.querySelector('#agregarFlujo');
const inputMes = document.querySelector('#mes');
const inputAnio = document.querySelector('#anio');
const btnAgregear = document.querySelector('#borrar');
const btnEliminar = document.querySelector('#eliminar');
const bntBorrarTitulo = document.querySelector('#borrarTitulo');
const data = document.querySelectorAll('.data');
const tbody = document.querySelectorAll('.tbody');
const agregarIngresos = document.querySelector('#agregarIngresos');
const agregarCostosDirectos = document.querySelector('#agregarCostosDirectos');
const agregarGastosAdmin = document.querySelector('#gatosAdmin');
const agregarRecursos = document.querySelector('#recursos');
const agregarCostos = document.querySelector('#costos');

window.onload = function() {
    btnAgregear.addEventListener('click', agregarFlujo);
    bntBorrarTitulo.addEventListener('click', borrarTitulo);
    agregarIngresos.addEventListener('click', () => { agregarTitulo("ingresos") });
    agregarCostosDirectos.addEventListener('click', () => { agregarTitulo("directos") });
    agregarGastosAdmin.addEventListener('click', () => { agregarTitulo("administrativos") });
    agregarRecursos.addEventListener('click', () => { agregarTitulo("recursos") });
    agregarCostos.addEventListener('click', () => { agregarTitulo("costos") });


}

function agregarFlujo() {
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

function agregarTitulo(tabla) {
    console.log("HOLA: ", tabla);
    let tablita = '';

    switch (tabla) {
        case "ingresos":
            tablita = document.querySelector('#tbingresos');
            ui.insertarConcepto(tablita);
            break;

        case "directos":
            tablita = document.querySelector('#tbdirectos');
            ui.insertarConcepto(tablita);
            break;

        case "administrativos":
            tablita = document.querySelector('#tbadministrativos');
            ui.insertarConcepto(tablita);
            break;

        case "recursos":
            tablita = document.querySelector('#tbrecursos');
            ui.insertarConcepto(tablita);
            break;


        case "costos":
            tablita = document.querySelector('#tbcostos');
            ui.insertarConcepto(tablita);
            break;

        default:
            console.log("Problemas en la creacion del problema");
            break;
    }

}



class UI {

    constructor() {

    }
    alerta(message, error) {
        const mensaje = document.createElement("div");
        mensaje.classList.add('alert');
        if (error === "error" || error === "periodo") {
            mensaje.classList.add('alert-danger');
        } else {
            mensaje.classList.add('alert-success');
        }
        mensaje.textContent = message;

        //agegar al dom
        //Agregar al dom
        if (!document.querySelector('.alert')) {
            if (error == "periodo") {
                const div = document.querySelector('#alertaPeriodo');
                console.log("hola periodo", div)
                console.log(mensaje)
                div.appendChild(mensaje);
            }
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
                hijos[j].insertBefore(td, hijos[j].lastElementChild);
            }
            i++;
        }
        this.alerta("Periodo creado", "success");
    }

    validarFecha(mes, anio) {
        //validamos si la fecha es correcta o no esta reprtida
        const elemento = document.getElementsByClassName(`${mes}${anio}`);


        if (elemento.length > 0) {
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
        let i = 0;
        let j = 0;
        while (i < data.length) {
            if (i < tabletr.length) {
                let elementos = Array.from(tabletr[i].children);
                tabletr[i].removeChild(elementos[elementos.length - 2]);
            }
            const hijos = Array.from(data[i].children);
            let td = hijos[hijos.length - 1];
            td.remove();
            i++;
        }
    }
    insertarConcepto(tabla) {
        const btnSave = document.querySelector('#btnConcepto');
        let thisTabla = tabla.children;
        let tbody = thisTabla[1];
        let thead = thisTabla[0];
        console.log("tbody", tbody);
        console.log("thead", thead);
        let titulosTabla = thead.children;
        let tamañoTabla = titulosTabla[0].children


        btnSave.addEventListener('click', function(e) {
            console.log(tamañoTabla.length)

            if (tamañoTabla.length <= 2) {
                ui.alerta('Error necesita insertar un perido', "periodo")
                alert("Inserte un periodo primero")
                console.log("Inserte un periodo");
                return;
            }

            let valor = document.querySelector('#concepto').value;
            let tr = document.createElement('tr');
            tr.classList.add('data');

            let th = document.createElement('th');
            let td = document.createElement('td');
            th.classList.add('row');
            th.setAttribute('id', `${valor}`)
            th.textContent = valor;
            td.textContent = "5";

            tr.appendChild(th);
            tr.appendChild(td);
            tbody.insertBefore(tr, tbody.lastElementChild);
            thisTabla = "";
            tbody = ""
            thead = ""

            e.stopPropagation();
        })

        thisTabla = "";
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