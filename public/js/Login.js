//------------------------------------- Funcion para validar datos -------------------------------------
function checkLogin(){
    let user = document.getElementById("username");
    let password = document.getElementById("password");
    if(user){
        if(user.value === 'admin' && password.value === 'admin'){
            alert("Tu madre");
        }
    }
    
}