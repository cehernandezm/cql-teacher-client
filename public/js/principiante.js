//----------------------------------- configurar blockly-----------------------------
var workspacePlayground;
function configurarBlockly(){
     workspacePlayground = Blockly.inject('blocklyDiv',
        {toolbox: document.getElementById('toolbox')});
}





//---------------------------------Funcion para cerrar sesion---------------------------------------------------
$('#LogOut').on('click',function(e){

    var cookie = document.cookie;
    var username = cookie.split("=")[1];
    let paquete = codigoLogout(username);
    
    $.ajax({
        type : "POST",
        dataType : "json",
        url : hostname + ":" + port + '/sendLup',
        data : {cuerpo : paquete},
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

//--------------------------------- FUNCION CUADO SE CARGA EL MODAL PARA ENVIAR DATA --------------------------
$('#modalData').on('show.bs.modal', function(e){
    var username = cookie.split("=")[1];
    let code = generarCodigo();
    document.getElementById('console-body').innerHTML = codigoConsulta(code,username);
});

//------------------------------------------- consumir api de enviar data --------------------------------------
$('#enviarLupData').on('click',function(e){
    document.getElementById("console-body-consola").innerHTML = "";
    $('#modalData').modal('hide');
    var username = cookie.split("=")[1];
    let code = generarCodigo();
    let paquete = codigoConsulta(code,username);

    $.ajax({
        type : "POST",
        dataType : "json",
        url : hostname + ":" + port + '/sendLup',
        data : {cuerpo : paquete},
        success : function(data,textStatus,xhr){
            let codigo = data["cuerpo"][0];
            if(data["cuerpo"][0] !== "error"){
                $('#modalLoginOut').modal('show');
                document.getElementById("console-body-out").innerHTML = codigo;

                //---------------------------------------- ANALIS CON JISON ----------------------------------------------------
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
