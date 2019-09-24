var hostname = 'http://localhost';
var port = 3000;


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



//---------------------------------------------- CREAR NUEVAS CONSULTAS ----------------------------------------
var tabID = 0;
function nuevaConsulta(tabla){
    $('#tab-list').append(
        $('<li class="nav-item">'+
        '<a class="nav-link" role="tab"  data-toggle="tab" href="#Cuerpo' + tabID + '" id="Tab' + tabID + '">Consulta ' + tabID + 
        '<button class="close" type="button" title="cerrar">'+
        '<span aria-hidden="true">&times;</span></button></a></li>')
    );

    let tab = document.createElement('div');
    tab.setAttribute('id','Cuerpo'+tabID);
    tab.className = 'tab-pane fade';

    let container = document.createElement('div');
    container.className ='table-responsive consultas';

    container.innerHTML = tabla;
    tab.appendChild(container);
    let tot = document.getElementById('tab-content');
    tot.appendChild(tab);
    tabID++;
    console.log(tabla);
}

//---------------------------------------------------------- CERRAR PESTAÑAS DE CONSULTAS -------------------------------------------
$('#tab-list').on('click','.close',function(){
    let id = $(this).parents('a').attr('id');
    $(this).parents('li').remove();
    $(id).remove();
    
    let numero = id.replace("Tab","");
    $('#Cuerpo'+numero).remove();
    let firsr = $('#tab-list a:first');
    firsr.tab('show');
 });


 //--------------------------------------------------------- OBTENER INFORMACION DE LA DB -------------------------------------------
 function getInfo(){
    var username = cookie.split("=")[1];
    let paquete = codigoStruct(username);
    $.ajax({
        type : "POST",
        dataType : "json",
        url : hostname + ":" + port + '/sendLup',
        data : {cuerpo : paquete},
        success : function(data,textStatus,xhr){
            let codigo = data["cuerpo"][0];
            if(data["cuerpo"][0] !== "error"){

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

 }