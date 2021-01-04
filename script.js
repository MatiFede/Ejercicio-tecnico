const agregarEmpleado = document.getElementById('agregar-empleado');

const tipoEmpleado = document.getElementById('tipo-empleado');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const edad = document.getElementById('edad');
const lenguaje = document.getElementById("lenguaje");
const tipo = document.getElementById("tipo");

const buscarId = document.getElementById('buscar-id');
const buscarIdInput = document.getElementById('buscar-id-input');
const sinResultados = document.getElementById('sin-resultados');

const promedio = document.getElementById('promedio');

const listaEmpleadosTabla = document.getElementById('lista-empleados-tabla');
const listaEmpleados = document.getElementById('lista-empleados');

const infoEmpleado = document.getElementById('info-empleado');

let idEmpleado = 0; 

//---------------CREO MI EMPRESA----------------

const miEmpresa = new Empresa(1, "Empresa SA", []); 

//--------------------EVENTOS-------------------

tipoEmpleado.addEventListener('change', (e)=> {
	modificarTipoEmpleado(e);
})

agregarEmpleado.addEventListener('submit',(e)=> {
	e.preventDefault();

	if (empleadoValido()) {
			actualizarClases();
			restaurarForm();
			actualizarEdad();		
			controlarEmpleadosCargados();
			limpiarInfo();
			actualizarListaEmpleados();
	}
})

buscarId.addEventListener('submit', (e)=>{
	mostrarSegunId(e);
});

//------------------FUNCIONES-------------------

function modificarTipoEmpleado(e) {
	if (e.target.value === "Programador") {
		lenguaje.classList.add("show");
		lenguaje.classList.remove("hidden");
		tipo.classList.remove("show");
		tipo.classList.add("hidden");
	} 
	if (e.target.value === "Diseñador") {
		lenguaje.classList.add("hidden");
		lenguaje.classList.remove("show");
		tipo.classList.remove("hidden");
		tipo.classList.add("show");
	}
}

function empleadoValido() {
	let empleadoValido = true;
	if (edad.value < 18 || edad.value > 100) {
		alert("ingrese edad válida")
		empleadoValido = false;
	}
	return empleadoValido;
}

function actualizarClases() {
	if (tipoEmpleado.value === "Programador") {
		actualizarId();
		const nuevoProgramador = new Programador
			(idEmpleado,
		 	 nombre.value,
		 	 apellido.value,
		 	 edad.value, 
		 	 lenguaje.value);

		miEmpresa.empleados.push(nuevoProgramador);
	} 
	if (tipoEmpleado.value === "Diseñador") {
		actualizarId();
		const nuevoDiseñador = new Diseñador
			(idEmpleado,
		 	 nombre.value, 
		 	 apellido.value, 
		 	 edad.value, 
			 lenguaje.value);

		miEmpresa.empleados.push(nuevoDiseñador);
	}
}

function actualizarId(){
	idEmpleado ++;
}

function restaurarForm() {
	nombre.value = "";
	apellido.value = "";
	edad.value = "";
}

function actualizarEdad() {
	let promedioEdad = 0;
	miEmpresa.empleados.forEach(empleado=>promedioEdad+= parseInt(empleado.edad));
	promedioEdad = promedioEdad / miEmpresa.empleados.length;
	promedio.innerText = promedioEdad.toFixed(0);
}

function controlarEmpleadosCargados(){
	if(miEmpresa.empleados.length > 0){
		listaEmpleadosTabla.classList.add('visible')
		listaEmpleadosTabla.classList.remove('invisible');
	}
}

function limpiarInfo() {
		listaEmpleados.innerHTML="";	
}

function actualizarListaEmpleados() {
	miEmpresa.empleados.forEach(empleado=> {
		const datosEmpleado = crearDivDatosEmpleado(empleado);
		listaEmpleados.append(datosEmpleado);

	})
}

function crearDivDatosEmpleado(empleado){

	const divDatosEmpleado = document.createElement('div');
	divDatosEmpleado.classList.add("datos-empleado-container");

	const idEmpleado = document.createElement('div');
	idEmpleado.innerHTML = empleado.id + '  |  ';

	const nombreEmpleado = document.createElement('div');
	nombreEmpleado.innerHTML = empleado.nombre;

	const apellidoEmpleado = document.createElement('div');
	apellidoEmpleado.innerHTML = empleado.apellido;

	const edadEmpleado = document.createElement('div');
	edadEmpleado.innerHTML = empleado.edad + ' años';

	const verEmpleado = document.createElement('div');
	verEmpleado.classList.add("datos-empleados-ver");
	verEmpleado.innerHTML = "ver datos";

	verEmpleado.addEventListener('click', () => mostrarInfoEmpleado(empleado))

	divDatosEmpleado.appendChild(idEmpleado);
	divDatosEmpleado.appendChild(nombreEmpleado);
	divDatosEmpleado.appendChild(apellidoEmpleado);
	divDatosEmpleado.appendChild(edadEmpleado);
	divDatosEmpleado.appendChild(verEmpleado);
	return divDatosEmpleado;
}

function mostrarInfoEmpleado(empleado) {
	let programadorOdiseñador;
	let title;
	let segunTipoEmpleado;

	if (empleado.tipo === undefined) { 
		programadorOdiseñador = "Programador";
		title = "Lenguaje";
		segunTipoEmpleado = empleado.lenguaje;
	} else {
		programadorOdiseñador = "Diseñador";
		title = "Tipo";
		segunTipoEmpleado = empleado.tipo;
	}
	infoEmpleado.classList.add('info-empleado-visible');
	infoEmpleado.innerHTML = obtenerModal(programadorOdiseñador, empleado, segunTipoEmpleado, title);
	const close = document.getElementById('close');
	close.addEventListener('click', ()=>{
		ocultarEmpleado();
	})
}

function obtenerModal(programadorOdiseñador, empleado, segunTipoEmpleado, title){
	return `<div class=info-empleado-contenido>
				<div id="close" class="close">X</div>
				<span class="tipo-empleado">${programadorOdiseñador}</span> 
				<br><br>
				Id:  ${empleado.id} <br>
				Nombre:  ${empleado.nombre} <br>
				Apellido:  ${empleado.apellido} <br>
				Edad:  ${empleado.edad} <br>
				${title}:  ${segunTipoEmpleado}
			</div>`
}

function ocultarEmpleado() {
	infoEmpleado.classList.remove('info-empleado-visible');
}

function mostrarSegunId(e) {
	e.preventDefault();
	let hayEmpleado = false;
	let idABuscar = parseInt(buscarIdInput.value);
	miEmpresa.empleados.forEach(empleado=>{
		if (empleado.id === idABuscar) {
			mostrarInfoEmpleado(empleado);
			sinResultados.innerText = "";
			hayEmpleado = true;
		}
	})
	if (!hayEmpleado) {
		sinResultados.innerText = "sin resultados";
	} 
}