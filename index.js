import { animationForm } from "./animation.js";

class Banco{
    constructor(){
        this.listaCuentas=[];
        this.intentosFallidos = {};
    }

    registrarse(nombre,apellido,cedula,nombreUsuario,contraseña){
        for(let cuenta of this.listaCuentas){
            const {usuario,propietario}= cuenta
            const {cedula:cedulaP}=propietario
            const {nombreUsuario:nombreUsuarioC}=usuario
            console.log(this.listaCuentas)
            if(nombreUsuarioC==nombreUsuario){
                return false
            }
            if(cedulaP==cedula){
                return false
            }

        }
        
        let numeroCuenta=this.generarNumeroCuenta(this.listaCuentas)
        const cuenta= new Cuenta(numeroCuenta,5000)
        cuenta.agregarUsuario(nombreUsuario,contraseña)
        cuenta.agregarPropietario(nombre,apellido,cedula)
        this.listaCuentas.push(cuenta)

        return cuenta
    }

    login(nombreUsuario,contraseña){
        if (this.intentosFallidos[nombreUsuario] && this.intentosFallidos[nombreUsuario] >= 3) {
            return false
        }

        for (let cuenta of this.listaCuentas) {
            const { usuario } = cuenta;
            const { nombreUsuario: nombreUsuarioC, contraseña: contraseñaC } = usuario;
            if (nombreUsuario === nombreUsuarioC && contraseñaC === contraseña) {
                // Restablecer los intentos fallidos después de un inicio de sesión exitoso
                this.intentosFallidos[nombreUsuario] = 0;
                return cuenta;
            }
        }

        // Incrementar el contador de intentos fallidos para el nombre de usuario
        if (!this.intentosFallidos[nombreUsuario]) {
            this.intentosFallidos[nombreUsuario] = 1;
        } else {
            this.intentosFallidos[nombreUsuario]++;
        }

        // Verificar si el nombre de usuario ha excedido el límite de intentos fallidos después del incremento
        if (this.intentosFallidos[nombreUsuario] >= 3){
            this.listaCuentas=this.listaCuentas.filter(x=>x.usuario.nombreUsuario!=nombreUsuario)
            return false;
        }

        return false; // Si el inicio de sesión falla, devuelve falso


        }

   
    

    //private
    generarNumeroCuenta(){
        let numeroCuentaRandom = "";
        const longitud = 10; // Longitud del número de cuenta
        const caracteresPermitidos = "0123456789";

        for (let i = 0; i < longitud; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
            numeroCuentaRandom += caracteresPermitidos.charAt(indiceAleatorio);
        }

        return numeroCuentaRandom;
    }
    }
    

class Cuenta{
    constructor(numeroCuenta,saldo){
        this.propietario;
        this.numeroCuenta=numeroCuenta;
        this.saldo=saldo;
        this.usuario;
        this.movimientos=[];
    }

    agregarPropietario(nombre,apellido,cedula,edad){
        this.propietario= new propietario(nombre,apellido,cedula,edad)
    }
    agregarUsuario(nombreUsuario,contraseña){
        const usuario = new Usuario(nombreUsuario, contraseña);
        this.usuario=usuario
    }

    consignar(monto){
        if(monto<=0){
            return 'Ingrese un monto correcto'
        }
        this.saldo=this.saldo+monto
        console.log(this.movimientos)
        const fechaActual=new Date
        const fecha=`${fechaActual.getDate()}/${fechaActual.getMonth()+1}/${fechaActual.getFullYear()}  ${fechaActual.getHours()}:${fechaActual.getMinutes()}`
        const movimiento= new Movimiento(fecha,'Consignar',monto,this.saldo);
        this.movimientos.push(movimiento)

    }

    retirar(monto){
        if(monto>this.saldo){
            return "No tiene suficiente saldo"
        }
        console.log(this.movimientos)

        this.saldo=this.saldo-monto
        const fechaActual=new Date
        const fecha=`${fechaActual.getDate()}/${fechaActual.getMonth()+1}/${fechaActual.getFullYear()}  ${fechaActual.getHours()}:${fechaActual.getMinutes()}`
        const movimiento= new Movimiento(fecha,'Retiro',monto,this.saldo);
        this.movimientos.push(movimiento)

    }
   
    consultarMovimientos(){
        
        return this.movimientos
    }

    consutarSaldo(){
        return this.saldo
    }
   
}

class propietario{
    constructor(nombre,apellido,cedula){
        this.nombre=nombre
        this.apellido=apellido
        this.cedula=cedula
    }
}


class Usuario{
    constructor(nombreUsuario, contraseña) {
        this.nombreUsuario = nombreUsuario;
        this.contraseña = contraseña;
    }

    cambiarContraseña(antiguaContraseña,nuevaContraseña) {
        if(this.contraseña == antiguaContraseña){
            this.contraseña = nuevaContraseña;
            return true
        }
       
        return false
    }


    
}

class Movimiento{
    constructor(fecha,concepto,valor,saldo){
            this.fecha=fecha
            this.concepto=concepto
            this.valor=valor
            this.saldo=saldo
    }
}




const banco=new Banco();


const form_register=document.querySelector('#form_register')
const form_login=document.querySelector("#form_login")


console.log(banco.listaCuentas)
form_register.addEventListener("submit",(e)=>{
    
    e.preventDefault()
    const formData=Object.fromEntries(new FormData(form_register))
    const {Nombre,Apellido,CC,userName,Contraseña}=formData
    const registro=banco.registrarse(Nombre,Apellido,CC,userName,Contraseña)
    console.log(registro)
    if(registro){
        mostrarMenu(registro)
       
    }

})

form_login.addEventListener("submit",(e)=>{
    e.preventDefault()
    const formData=Object.fromEntries(new FormData(form_login))
    const {userName,password}=formData
    const login=banco.login(userName,password)
    
    if(login){
        mostrarMenu(login)
    }else{

    }
    console.log(banco.listaCuentas)
    
})

const container_form=document.querySelector('.container')
const header=document.querySelector('.header')
const main_user=document.querySelector('.main_user')
const retiro_Section=document.querySelector('.retiro_section')


function mostrarMenu(cuenta){
    if (!container_form.classList.contains('container_hidden')) {
        container_form.classList.add('container_hidden');
    }

    setTimeout(() => {
        if (main_user.classList.contains('main_user_hidden')) {
            main_user.classList.remove('main_user_hidden');
        }
        if (!header.classList.contains('header_active')) {
            header.classList.add('header_active');
        }
    }, 1000);

    renderizarMenu(cuenta)
}

function renderizarMenu(cuenta){
    const user_titles=document.querySelectorAll('.user_title')
    
   

    const {propietario,numeroCuenta,saldo,movimientos}=cuenta
    const {nombre,apellido,cedula}=propietario
    user_titles[0].innerHTML=`Nombre ${nombre} ${apellido}`
    user_titles[1].innerHTML=`CC: ${cedula}`
    user_titles[2].innerHTML=`Numero de cuenta: ${numeroCuenta}`
    menu(cuenta)

}


let eventListenersAdded = false;
function menu(cuenta){

const retirarMenu=document.querySelector("#retirar")
const retirar_accion=document.querySelector('#retirar_accion')
const main_user_options=document.querySelector('.main_user_options')

//recuperar lo necesario para cosignar
const deposito_section=document.querySelector('.deposito_section')
const depositoMenu=document.querySelector('#deposito_menu')
const depositar_accion=document.querySelector("#deposito_accion")

//movimientos
const movimientos=document.querySelector("#movimientos")
const movimientos_section=document.querySelector(".movimientos_section")
const tbody = document.getElementById('tbody')

//Consultar saldo
const saldo_section=document.querySelector('.saldo_section')
const saldo_accion=document.querySelector("#saldo")
const saldotxt=document.querySelector('.saldo')
const retroceder=document.querySelector('.back_figure')


//cambiar contrasela
const cambioPasswordSection=document.querySelector(".cambiar_contraseña")
const cambioPasswordMenu=document.querySelector("#Cambiar_contraseña")
const cambioPasswordAccion=document.querySelector("#cambiar_contraseña_accion")
if(!eventListenersAdded){


//retirar
retirarMenu.addEventListener("click",()=>{
    console.log(cuenta.saldo)
    
    retroceder.classList.remove('hidden')
    main_user_options.classList.add('hidden')
    retiro_Section.classList.remove('hidden')
  
    
    
})
retroceder.addEventListener("click",()=>{
    retroceder.classList.add('hidden')
    retiro_Section.classList.add('hidden')
    deposito_section.classList.add('hidden')
    movimientos_section.classList.add('hidden')
    tbody.innerHTML=""
    saldo_section.classList.add('hidden')
    cambioPasswordSection.classList.add("hidden")
    main_user_options.classList.remove('hidden')
    renderizarMenu(cuenta)
})


retirar_accion.addEventListener("click",()=>{
    const input=document.querySelector('#retiro_monto')
    let monto =cuenta.retirar(parseInt(input.value))
    
   
})

//Consignar
depositoMenu.addEventListener("click",()=>{
    
      retroceder.classList.remove('hidden')
      deposito_section.classList.remove('hidden')
      main_user_options.classList.add('hidden')
 
      
  
  })

 

depositar_accion.addEventListener("click",()=>{
    const input=document.querySelector('#depositar_monto')
    cuenta.consignar(parseInt(input.value))
})

//consultar Movimientos
movimientos.addEventListener("click",()=>{
    retroceder.classList.remove('hidden')
    movimientos_section.classList.remove('hidden')
    main_user_options.classList.add('hidden')
    agregarFilas(cuenta.consultarMovimientos())
})

//Consultar saldo
saldo_accion.addEventListener("click",()=>{
    retroceder.classList.remove('hidden')
    saldo_section.classList.remove('hidden')
    main_user_options.classList.add('hidden')
    saldotxt.innerHTML=`$${cuenta.consutarSaldo()}`
})

//cambiar contraseña
cambioPasswordMenu.addEventListener("click",()=>{
    retroceder.classList.remove('hidden')
    cambioPasswordSection.classList.remove('hidden')
    main_user_options.classList.add('hidden')
})

cambioPasswordAccion.addEventListener("click",()=>{
    const contraseñaAntigua=document.querySelector("#contraseña_actual")
    const contraseñaNueva=document.querySelector("#contraseña_nueva")
    cuenta.usuario.cambiarContraseña(contraseñaAntigua.value,contraseñaNueva.value)
})
eventListenersAdded = true;
}
}









function agregarFilas(movimientos) {
    // Obtener referencia al cuerpo de la tabla
    let tbody = document.getElementById('tbody');

    // Iterar sobre el array de movimientos y agregar una fila por cada objeto
    movimientos.forEach(function(movimiento) {
        // Crear una nueva fila
        var newRow = document.createElement('tr');


        // Crear las celdas de la fila
        var cells = [
            document.createElement('td'),
            document.createElement('td'),
            document.createElement('td'),
            document.createElement('td')
        ];

        // Agregar los datos del movimiento a las celdas
        cells[0].appendChild(document.createTextNode(movimiento.fecha));
        cells[1].appendChild(document.createTextNode(movimiento.concepto));
        cells[2].appendChild(document.createTextNode(movimiento.valor));
        cells[3].appendChild(document.createTextNode(movimiento.saldo));

        // Agregar las celdas a la fila
        cells.forEach(function(cell) {
            newRow.appendChild(cell);
        });

        // Agregar la fila al cuerpo de la tabla
        tbody.appendChild(newRow);
    });
}

//salir
const salir=document.querySelector('#salir')

salir.addEventListener("click",()=>{
    main_user.classList.add('main_user_hidden');
    header.classList.remove('header_active');
    setTimeout(()=>{
        container_form.classList.remove('container_hidden');
    },1000)
  
    
})










//Se encarga de la animacion del formulario
animationForm()