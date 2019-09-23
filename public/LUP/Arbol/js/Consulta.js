var Consulta = /** @class */ (function () {
    function Consulta(data) {
        this.data = data;
    }
    Consulta.prototype.ejecutar = function () {
        window.nuevaConsulta(this.data);
        return "";
    };
    return Consulta;
}());
