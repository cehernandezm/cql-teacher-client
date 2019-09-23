var MensajesError = /** @class */ (function () {
    function MensajesError(mensaje, tipo, l, c) {
        this.mensaje = mensaje;
        this.tipo = tipo;
        this.l = l;
        this.c = c;
    }
    MensajesError.prototype.ejecutar = function () {
        document.getElementById("console-body-consola").innerHTML +=
            "<p style = \"color:red;\">" + this.tipo + ": " + this.mensaje + ",Linea: " + this.l + ",Columna: " + this.c + "</p>";
        return "";
    };
    return MensajesError;
}());
