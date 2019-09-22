var hostname = 'http://localhost';
var port = 3000;


//------------------------------------- Funcion para validar datos -------------------------------------
function checkLogin(){
    let user = document.getElementById("username");
    let password = document.getElementById("password");
    if(user){
        if(user.value === 'admin' && password.value === 'admin'){
            document.cookie = "username=" + user.value;
            window.location.href = '/dificultad'
        }
    }
    
}

//-------------------------------------------------------- FUNCION DEL MODAL PARA LOGIN ----------------------------------------
$('#modalLogin').on('show.bs.modal', function(e){
    let usuario = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let lupGenerado = "[+LOGIN]\n\t[+USER]\n\t\t" + usuario + "\n\t[-USER]\n\t[+PASS]\n\t\t" + password + "\n\t[-PASS]\n[-LOGIN]";
    document.getElementById("console-body").innerHTML = lupGenerado;
});

/*
* EVENTO CLICK SOBRE EL BOTON DE LOGIN
*/

$('#enviarLupLogin').on('click',function(e){
    let usuario = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let lupGenerado = "[+LOGIN]\n\t[+USER]\n\t\t" + usuario + "\n\t[-USER]\n\t[+PASS]\n\t\t" + password + "\n\t[-PASS]\n[-LOGIN]";
    
    $.ajax({
        type : "POST",
        dataType : "json",
        url : hostname + ":" + port + '/sendLup',
        data : {cuerpo : lupGenerado},
        success : function(data,textStatus,xhr){
            console.log("INFO" + data["cuerpo"]);   
        },
        error : function(XMLHttpRequest,textStatus,errorThrown){
            console.log("ERROR: " + textStatus );
        }

    });
});