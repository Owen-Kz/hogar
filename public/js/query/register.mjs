const registerForm = document.getElementById("register-form")
const loaderbody = document.getElementById("loaderbody")
import { WriteError, WriteSucess } from "./alertMessages.mjs"
const password1 = document.getElementById("pass1")
const password2 = document.getElementById("pass2") 



password1.addEventListener("change", function(){
    if(password1.value != password2.value){
        WriteError(`<strong class="font__weight-semibold">Error: </strong> Passwords Do not match.`)
    }else{
        // alertContainer.classList.add("hide")
    }
})

password2.addEventListener("change", function(){
    if(password1.value != password2.value){
        WriteError(`<strong class="font__weight-semibold">Error: </strong> Passwords Do not match.`)
    }else{
        // alertContainer.classList.add("hide")
    }
})
registerForm.addEventListener("submit", function(e){
    e.preventDefault()
    loaderbody.setAttribute("class", "loaderbody")

    const data = {
        email:signupEmail.value,
        password: pass1.value
    }
    if(password1.value != password2.value){
        WriteError(`<strong class="font__weight-semibold">Error: </strong> Passwords Do not match.`)
    }else{
        
        try{

    fetch(`/userRegister`, {
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-type" : "application/JSON"
        }
    }).then(res =>res.json())
    .then(data =>{
        loaderbody.classList.add("hide")
        if(data.success){
            WriteSucess(`<strong class="font__weight-semibold">Sucess</strong> ${data.success}.`)
            window.location.reload()
        }else if(data.error){
            WriteError(`<strong class="font__weight-semibold">Error: </strong> ${data.error}.`)
        }else{
            console.log(data)
            WriteError(`<strong class="font__weight-semibold">Internal Server Error</strong>.`)
        }
    })
}catch(error){
    loaderbody.classList.add("hide")

    WriteError(`<strong class="font__weight-semibold">Internal Server Error</strong>.: ${error.message}`)
}
    }
})