var Mensaje = /** @class */ (function () {
    function Mensaje(mensaje) {
        this.mensaje = mensaje;
    }
    Mensaje.prototype.ejecutar = function () {
        document.getElementById("console-body-consola").innerHTML +=
            "<p style = \"color:white;\">" + this.mensaje + "</p>";
        return "";
    };
    return Mensaje;
}());
