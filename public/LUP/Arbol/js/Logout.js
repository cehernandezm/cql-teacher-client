var Logout = /** @class */ (function () {
    function Logout(estado) {
        this.estado = estado;
    }
    Logout.prototype.ejecutar = function () {
        if (this.estado) {
            document.cookie = "username=;";
            window.location.href = '/';
        }
        return this.estado;
    };
    return Logout;
}());
