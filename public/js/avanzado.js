/*------------------------------------------------------------------------------------------------------------------------------------------------- 
------------------------------------------------------- CONFIGURACION DE LOS EDITORES DE TEXTO ----------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------*/

var preferencias = {
  lineNumbers: true,
  mode: "text/x-sql",
  theme: "paraiso-dark"
};

var codeEditor = [];

var list = document.getElementById("tab-list2");
new Sortable(list);

/*--------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------- PESTAÑAS -------------------------------------------------------------------------------
 -------------------------------------------------------------------------------------------------------------------------------------------------*/

var tabID = 0;

//-------------------------------------------------- agregar una nueva pestaña ----------------------------------------------------------------------
$("#newTab").click(function() {
  crearPestaña("");
});

//-------------------------------------------------- FUNCION QUE CREA UNA NUEVA PESTAÑA Y LE SETE UN VALOR -------------------------
function crearPestaña(contenido) {
  $("#tab-list2").append(
    $(
      '<li class="nav-item">' +
        '<a class="nav-link" role="tab"  data-toggle="tab" href="#Cuerpo' +
        tabID +
        '" id="Tab' +
        tabID +
        '">Tab ' +
        tabID +
        '<button class="close" type="button" title="cerrar">' +
        '<span aria-hidden="true">&times;</span></button></a></li>'
    )
  );

  let tab = document.createElement("div");
  tab.setAttribute("id", "Cuerpo" + tabID);
  tab.className = "tab-pane fade";

  let row = document.createElement("div");
  row.className = "row";

  let col2 = document.createElement("div");
  col2.className = "col-md-10";

  let pes = document.createElement("textarea");
  pes.setAttribute("id", tabID + "P");
  col2.appendChild(pes);

  row.appendChild(col2);

  tab.appendChild(row);
  let tot = document.getElementById("tab-content2");
  tot.appendChild(tab);

  let ed = CodeMirror.fromTextArea(pes, preferencias);
  let editor = {
    nombre: "Tab" + tabID,
    editor: ed
  };
  codeEditor.push(editor);
  ed.refresh();
  ed.getDoc().setValue(contenido);
  tabID++;
}

//-------------------------------------------------- cerrar pestaña ---------------------------------------------------------------------------------

$("#tab-list2").on("click", ".close", function() {
  let id = $(this)
    .parents("a")
    .attr("id");
  $(this)
    .parents("li")
    .remove();
  $(id).remove();

  let index = obtenerIndex(id);
  if (index != null) codeEditor.splice(index, 1);

  let firsr = $("#tab-list a:first");
  firsr.tab("show");
});

//--------------------------------- FUNCION CUADO SE CARGA EL MODAL PARA ENVIAR DATA --------------------------
$("#modalData2").on("show.bs.modal", function(e) {
  var username = cookie.split("=")[1];
  let tab = $("#tab-list2 li a.active").attr("id");
  let index = obtenerIndex(tab);
  if (index != null) {
    let pestaña = codeEditor[index];
    let editor = pestaña.editor;

    let seleccion = editor.getSelection();
    if (!seleccion) seleccion = editor.getValue();

    document.getElementById("console-body").innerHTML = codigoConsulta(
      seleccion,
      username
    );
  } else alert("Seleccione una pestaña");
});

//------------------------------------------- consumir api de enviar data --------------------------------------
$("#enviarLupData2").on("click", function(e) {
  document.getElementById("console-body-consola").innerHTML = "";
  $("#modalData2").modal("hide");
  var username = cookie.split("=")[1];
  let tab = $("#tab-list2 li a.active").attr("id");
  let index = obtenerIndex(tab);
  if (index != null) {
    let pestaña = codeEditor[index];
    let editor = pestaña.editor;

    let seleccion = editor.getSelection();
    if (!seleccion) seleccion = editor.getValue();

    let paquete = codigoConsulta(seleccion, username);

    $.ajax({
      type: "POST",
      dataType: "json",
      url: hostname + ":" + port + "/sendLup",
      data: { cuerpo: paquete },
      success: function(data, textStatus, xhr) {
        let codigo = data["cuerpo"][0];
        if (data["cuerpo"][0] !== "error") {
          $("#modalLoginOut").modal("show");
          document.getElementById("console-body-out").innerHTML = codigo;

          //---------------------------------------- ANALIS CON JISON ----------------------------------------------------
          GramaticaLup.parse(codigo);

          let instrucciones = GramaticaLup.arbol.raiz;
          instrucciones.forEach(function(ins, index, array) {
            console.log("Valor: " + ins.ejecutar());
          });
        } else alert("Ha ocurrido un error en la conexion");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("ERROR: " + textStatus);
      }
    });
  } else alert("Seleccione una pestaña");
});

//--------------------------------------------------- obtener index de la lista de editores ------------------------------------------------------
function obtenerIndex(nombre) {
  for (let i = 0; i < codeEditor.length; i++) {
    let pestaña = codeEditor[i];
    if (pestaña.nombre === nombre) return i;
  }
  return null;
}

//---------------------------------Funcion para cerrar sesion---------------------------------------------------
function getOut() {
  document.cookie = "username=;";
  window.location.href = "/";
}

//----------------------------------------- ABRIR UN ARCHIVO --------------------------------------------
$("#openFile").on("click", function(e) {
  fileElem = document.getElementById("file");
  if (fileElem) file.click();
});

//------------------------------------------ SETEA EL VALOR DEL ARCHIVO A UN EDITOR DE TEXTO --------------------------
function handleFiles() {
  const file = document.getElementById("file").files[0];
  var fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent) {
    var textFromFileLoaded = fileLoadedEvent.target.result;
    console.log(textFromFileLoaded);
    crearPestaña(textFromFileLoaded);
  };

  fileReader.readAsText(file, "UTF-8");
}

//------------------------------------------ GUARDAR UN ARCHIVO EN ESPECIFICO -----------------------------------------

function dowload() {
  let tab = $("#tab-list2 li a.active").attr("id");
  let index = obtenerIndex(tab);
  if (index != null) {
    let pestaña = codeEditor[index];
    let editor = pestaña.editor;

    seleccion = editor.getValue();
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(seleccion)
    );
    element.setAttribute("download", "CodigoCql.cql");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  } else alert("Seleccione una pestaña");
}
