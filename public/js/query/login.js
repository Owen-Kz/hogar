const loginForm = document.getElementById("login-form")
const loaderbody = document.getElementById("loaderbody")
import { WriteError } from "./alertMessages.js"
loginForm.addEventListener("submit", function(e){
    e.preventDefault()
    loaderbody.setAttribute("class", "loaderbody")

    const data = {
        email:email.value,
        password: password.value
    }
    try{
    fetch(`/userLogin`, {
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
            WriteError(`<strong class="font__weight-semibold">Error: </strong> ${data.message}.`)
        }else{
            console.log(data)
            WriteError(`<strong class="font__weight-semibold">Internal Server Error</strong>.`)
        }
    })
}catch(error){
    loaderbody.classList.add("hide")

    WriteError(`<strong class="font__weight-semibold">Internal Server Error</strong>.: ${error.message}`)
}
})