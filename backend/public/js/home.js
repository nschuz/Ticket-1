import { CerrarSesion } from './signout.js'
class Home {
    constructor(enpoint) {
        this.enpoint = enpoint;
    }

    async renderPresuouestos() {
        const presupuestos = await fetch(this.enpoint);
        const data = await presupuestos.json();
        const tbody = document.querySelector('#tablaBody');

        for (let i = 0; i < data.length; i++) {
            const { id_presupuesto, fecha_creacion, nombre, descripcion, version, activo } = data[i];

            const tr = document.createElement('tr');

            const tid = document.createElement('td');
            tid.innerHTML = id_presupuesto;

            const tdnombre = document.createElement('td');
            tdnombre.innerHTML = nombre;

            const tdfecha = document.createElement('td');
            tdfecha.innerHTML = fecha_creacion;

            const tddesc = document.createElement('td');
            tddesc.innerHTML = descripcion;

            const tdversion = document.createElement('td');
            tdversion.innerHTML = version;

            const tdactivo = document.createElement('td');
            tdactivo.innerHTML = activo;

            const tdIconos = document.createElement('td');
            tdIconos.innerHTML = `<button href="#myModal2" id=${id_presupuesto} data-toggle="modal" class="email btn-danger"><i class="fas fa-trash-alt "></i></button>  <button href="#myModal3"  class = "emailU btn-primary" id=${id_presupuesto} data-toggle="modal"><i class="fas fa-pencil-alt"></i></button><button href="#myModal3" class="emailU btn-success" id=${id_presupuesto} data-toggle="modal"><i class="far fa-paper-plane"></i></button> `;
            tr.appendChild(tid);
            tr.appendChild(tdnombre);
            tr.appendChild(tddesc);
            tr.appendChild(tdfecha);
            tr.appendChild(tdversion);
            tr.appendChild(tdactivo);
            tr.appendChild(tdIconos);
            tbody.appendChild(tr);
        }

    }

    async deletePresupuesto(id) {

        const response = await fetch('http://localhost:8080/it/presupuesto-delete/' + id, {
            method: 'DELETE',
        });
        const data = await response.json();
        console.log(data);
    }

    async updatePresupuesto(id) {
        const nombre = document.querySelector('#inputnombre').value;
        const descripcion = document.querySelector('#inputdescripcion').value;
        const fecha = document.querySelector('#inputfecha').value;
        const version = document.querySelector('#inputversion').value
        const estado = document.querySelector('#inputestado').value;

        const formData = new URLSearchParams();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('fecha', fecha);
        formData.append('version', version);
        formData.append('estado', estado)
        console.log(formData);

        const response = await fetch('http://localhost:8080/it/presupuesto-update/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formData,
            //JSON.stringify({ nombre: nombre, apellido: apellido, email: email }),
        });
        const data = await response.json();
        //alertanavUpdate.appendChild(alerta("Usuario  modificado"));
        console.log(data)
        window.location.reload();

    }

}





window.onload = async function() {
    await home.renderPresuouestos();
    console.log("hoooo")
    const deletebtn = document.querySelectorAll('.email');
    const updatebtn = document.querySelectorAll('.emailU');
    const btnBorrar = document.querySelector('#borrar')
    const btnUpdate = document.querySelector('#modificar')
    const boton1 = document.querySelector('#cerrarSesion');
    const boton2 = document.querySelector('#cerrarSesion2');

    boton1.addEventListener('click', signout.cerrarSesion);
    boton2.addEventListener('click', signout.cerrarSesion);

    for (let i = 0; i < deletebtn.length; i++) {
        deletebtn[i].addEventListener('click', () => {
            const id = deletebtn[i].getAttribute('id');
            btnBorrar.addEventListener('click', () => {
                console.log(`Borrando ${id}`);
                home.deletePresupuesto(id)
                    // modal2.classList = 'hide'
                console.log("Presupuesto Borrado")
                window.location.reload();
            })

        })
    }

    for (let i = 0; i < updatebtn.length; i++) {
        updatebtn[i].addEventListener('click', () => {
            const id = updatebtn[i].getAttribute('id');
            btnUpdate.addEventListener('click', async() => {
                home.updatePresupuesto(id);
            })
        })

    }

}

const home = new Home("http://localhost:8080/it/presupuestos");
const signout = new CerrarSesion();