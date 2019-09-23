

//-------------------------------------------------------- FUNCION DEL MODAL PARA LOGIN ----------------------------------------
$('#modalLogin').on('show.bs.modal', function(e){
    let usuario = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let lupGenerado = "[+LOGIN]\n\t[+USER]\n\t\t" + usuario + "\n\t[-USER]\n\t[+PASS]\n\t\t" + password + "\n\t[-PASS]\n[-LOGIN]";
    document.getElementById("console-body").innerHTML = lupGenerado;
    
});

/*
* EVENTO CLICK SOBRE EL BOTON OK QUE CERRARA EL MODAL CON EL LUP DE RETORNO
*/
$('#buttonLUPIN').on('click',function(e){
    $('#modalLoginOut').modal('hide');
});

/*
* EVENTO CLICK SOBRE EL BOTON DE LOGIN 
*/

$('#enviarLupLogin').on('click',function(e){
    $('#modalLogin').modal('hide');
    let usuario = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let lupGenerado = "[+LOGIN]\n\t[+USER]\n\t\t" + usuario + "\n\t[-USER]\n\t[+PASS]\n\t\t" + password + "\n\t[-PASS]\n[-LOGIN]";
    
    $.ajax({
        type : "POST",
        dataType : "json",
        url : hostname + ":" + port + '/sendLup',
        data : {cuerpo : lupGenerado},
        success : function(data,textStatus,xhr){
            let codigo = data["cuerpo"][0];
            if(data["cuerpo"][0] !== "error"){
                $('#modalLoginOut').modal('show');
                document.getElementById("console-body-out").innerHTML = codigo;
                GramaticaLup.parse(codigo);
            
                let instrucciones = GramaticaLup.arbol.raiz;
                instrucciones.forEach(function(ins,index,array){
                    console.log("Valor: " + ins.ejecutar());
                });
            }
            else  alert("Ha ocurrido un error en la conexion");   
        },
        error : function(XMLHttpRequest,textStatus,errorThrown){
            console.log("ERROR: " + textStatus );
        }

    });
});