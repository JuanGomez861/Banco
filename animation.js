export function animationForm(){
    
const iniciar=document.querySelector("#iniciar")
const registrarse=document.querySelector("#register")
const toogle= document.querySelector(".toogle_container")
const inicioForm=document.querySelector(".inicio")
const registerForm=document.querySelector(".register")
registrarse.addEventListener("click",()=>{
    toogle.classList.add("left_active")
    inicioForm.classList.add("inicio_active")
    registerForm.classList.add("register_hidden")
})

iniciar.addEventListener("click",()=>{
    toogle.classList.remove("left_active")
    inicioForm.classList.remove("inicio_active")
    registerForm.classList.remove("register_hidden")

})

}