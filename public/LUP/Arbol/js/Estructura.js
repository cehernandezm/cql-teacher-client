var Estructura = /** @class */ (function () {
    function Estructura(cuerpo) {
        this.cuerpo = cuerpo;
    }
    Estructura.prototype.ejecutar = function () {
        if (this.cuerpo) {
            var salida = '';
            var bases = this.cuerpo['bases'];
            //---------------------------------------- ACCEDER A TODAS LAS BASES DE DATOS ----------------------------------------------
            bases.forEach(function (element) {
                salida += '<li class ="list-group-item active"> <a class="h4 text-white" data-toggle = "collapse" href="#objetos'
                    + element['name'] + '">' + element['name'] + '</a>'
                    + '<ul class ="list-group">'
                    + '<li class ="list-group-item list-group-item-danger collapse" id="objetos' + element['name'] + '">'
                    + '<a class="text-dark h5" data-toggle = "collapse" href="#tabla' + element['name'] + '">TABLAS</a>'
                    + '<ul class ="list-group">';
                var objetos = element['objetos'];
                //---------------------------------------------------- INCIO TABLA -----------------------------------------------------
                if (objetos != null) {
                    objetos.forEach(function (subObjetos) {
                        if (subObjetos['tipo'] == "tabla") {
                            var tablas = subObjetos['data'];
                            tablas.forEach(function (tabla) {
                                salida += '<li class="list-group-item list-group-item-dark collapse" id="tabla' + element['name']
                                    + '"><a class="text-dark h6" data-toggle="collapse" href="#columna' + tabla['name'] + '">'
                                    + tabla['name'] + '</a>'
                                    + '<ul class ="list-group">';
                                //----------------------------------- COLUMNAS ------------------------------------------------------------
                                var columnas = tabla['columnas'];
                                columnas.forEach(function (columna) {
                                    salida += '<li class="list-group-item list-group-item-light collapse" id="columna' + tabla['name']
                                        + '"><p class="h7 text-dark">' + columna + '</p></li>';
                                });
                                salida += '</ul>';
                                salida += '</li>';
                            });
                        }
                    });
                }
                salida += '</ul>';
                salida += ' </li>';
                //---------------------------------------------------------------- FIN TABLA----------------------------------
                //----------------------------------------------------- USER TYPES---------------------------------------------
                salida += '<li class ="list-group-item list-group-item-danger collapse" id="objetos' + element['name'] + '">'
                    + '<a class="text-dark h5" data-toggle = "collapse" href="#user' + element['name'] + '">USER TYPES</a>'
                    + '<ul class ="list-group">';
                if (objetos != null) {
                    objetos.forEach(function (subObjetos) {
                        if (subObjetos['tipo'] == "type") {
                            var users = subObjetos['data'];
                            users.forEach(function (user) {
                                salida += '<li class="list-group-item list-group-item-dark collapse" id="user' + element['name']
                                    + '"><a class="text-dark h6" data-toggle="collapse" href="#atributo' + user['name'] + '">'
                                    + user['name'] + '</a>'
                                    + '<ul class ="list-group">';
                                //---------------------------------------------------------A TRIBUTOS ---------------------------------
                                var atributos = user['atributos'];
                                atributos.forEach(function (atributo) {
                                    salida += '<li class="list-group-item list-group-item-light collapse" id="atributo' + user['name']
                                        + '"><p class="h7 text-dark">' + atributo + '</p></li>';
                                });
                                salida += '</ul>';
                                salida += '</li>';
                            });
                        }
                    });
                }
                salida += '</ul>';
                salida += ' </li>';
                //------------------------------------------------------FIN USER TYPES -------------------------------
                //------------------------------------------------------ PROCEDURES --------------------------------------------------------
                salida += '<li class ="list-group-item list-group-item-danger collapse" id="objetos' + element['name'] + '">'
                    + '<a class="text-dark h5" data-toggle = "collapse" href="#procedure' + element['name'] + '">PROCEDURES</a>'
                    + '<ul class ="list-group">';
                if (objetos != null) {
                    objetos.forEach(function (subObjetos) {
                        if (subObjetos['tipo'] == "procedur") {
                            var procedures = subObjetos['data'];
                            procedures.forEach(function (procedure) {
                                salida += '<li class="list-group-item list-group-item-dark  collapse" id="procedure' + element['name']
                                    + '"><p class="h6 text-dark">' + procedure + '</p></li>';
                            });
                        }
                    });
                }
                salida += '</ul>';
                salida += ' </li>';
                //------------------------------------------------------- FIN PROCEDURES ----------------------------------------------------
                salida += '</ul>';
                salida += '</li>';
            });
            document.getElementById("infoBases").innerHTML = salida;
            console.log(this.cuerpo);
        }
        return "";
    };
    return Estructura;
}());
