// campos del formulario
const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

// ui
const formulario = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");

// clases
class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];

        console.log(this.citas);
    }
}

class UI {

    imprimirAlerta(mensaje, tipo) {
        // crear el div
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

        // agregar clase en base al tipo de error 
        if(tipo === "error") {
            divMensaje.classList.add("alert-danger");
        } else {
            divMensaje.classList.add("alert-success");
        }

        // mensaje de error
        divMensaje.textContent = mensaje;

        // agregar al DOM
        document.querySelector("#contenido").insertBefore(divMensaje, document.querySelector(".agregar-cita"));

        // quitar la oferta despues de 5 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }

}

// instanciar clases
const ui = new UI();
const administarCitas = new Citas();

// regristar eventos
eventListener();
function eventListener() {
    mascotaInput.addEventListener("input", datosCita);
    propietarioInput.addEventListener("input", datosCita);
    telefonoInput.addEventListener("input", datosCita);
    fechaInput.addEventListener("input", datosCita);
    horaInput.addEventListener("input", datosCita);
    sintomasInput.addEventListener("input", datosCita);

    formulario.addEventListener("submit", nuevaCita);
}

// objeto con la informacion de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// agraga datos al objeto de cita
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

// validar y agregar una nueva cita a la clase de citas
function nuevaCita(e) {
    e.preventDefault();

    // extraer la informacion del objeto de citas
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // validar 
    if( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ) {
        ui.imprimirAlerta("todos los campos son obligatorios", "error");

        return;
    }

    // generar un id unico
    citaObj.id = Date.now();

    // creando una nueva cita
    administarCitas.agregarCita({...citaObj});

    // reininiar el objto
    reiniciarObjeto();

    // reiniciar el formulario 
    formulario.reset();

    // mostrar el html de las citas
    
}

function reiniciarObjeto() {
    citaObj.mascota = '',
    citaObj.propietario = '',
    citaObj.telefono = '',
    citaObj.fecha = '',
    citaObj.hora = '',
    citaObj.sintomas = ''
}