/*------------------------------------------------------------------------------------------------------------------------------------------------- 
------------------------------------------------------- CONFIGURACION DE LOS EDITORES DE TEXTO ----------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------*/

var preferencias = {
    lineNumbers: true,
    mode: "text/x-sql",
    theme: "paraiso-dark",
};

var codeEditor = [];

var list = document.getElementById('tab-list');
new Sortable(list);


/*--------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------- PESTAÑAS -------------------------------------------------------------------------------
 -------------------------------------------------------------------------------------------------------------------------------------------------*/

 var tabID = 0;
 
 //-------------------------------------------------- agregar una nueva pestaña ----------------------------------------------------------------------
 $("#newTab").click(function(){
    $('#tab-list').append(
        $('<li class="nav-item">'+
        '<a class="nav-link" role="tab"  data-toggle="tab" href="#Cuerpo' + tabID + '" id="Tab' + tabID + '">Tab ' + tabID + 
        '<button class="close" type="button" title="cerrar">'+
        '<span aria-hidden="true">&times;</span></button></a></li>')
    );


    let tab = document.createElement('div');
    tab.setAttribute('id','Cuerpo'+tabID);
    tab.className = 'tab-pane fade';

    let row = document.createElement('div');
    row.className ='row';


    let col2=document.createElement('div');
    col2.className ='col-md-10';

    let pes = document.createElement('textarea');
    pes.setAttribute('id',tabID+'P');
    col2.appendChild(pes);



    row.appendChild(col2);


    tab.appendChild(row);
    let tot = document.getElementById('tab-content');
    tot.appendChild(tab);

    let ed = CodeMirror.fromTextArea(pes,preferencias);
    let editor = {
        nombre : "Tab" + tabID,
        editor : ed
    };
    codeEditor.push(editor);
    ed.refresh();

    tabID++;
 });

 //-------------------------------------------------- cerrar pestaña ---------------------------------------------------------------------------------

 $('#tab-list').on('click','.close',function(){
    let id = $(this).parents('a').attr('id');
    $(this).parents('li').remove();
    $(id).remove();

    let index = obtenerIndex(id);
    if(index != null) codeEditor.splice(index,1);

    let firsr = $('#tab-list a:first');
    firsr.tab('show');
 });

 //--------------------------------------------------- Ejecutar Codigo ----------------------------------------------------------------------------
$('#ejecutarCode').click(function(){
    let tab = $('#tab-list li a.active').attr('id');
    let index = obtenerIndex(tab);
    if(index != null){
        let pestaña = codeEditor[index];
        let editor = pestaña.editor;

        let seleccion = editor.getSelection();
        if(!seleccion) seleccion = editor.getValue();
        console.log(seleccion);
    }else alert("Seleccione una pestaña");
});

//--------------------------------------------------- obtener index de la lista de editores ------------------------------------------------------
function obtenerIndex(nombre){
    for(let i = 0; i < codeEditor.length; i++){
        let pestaña = codeEditor[i];
        if(pestaña.nombre === nombre) return i;
    }
    return null;
}