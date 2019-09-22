var Login = /** @class */ (function () {
    function Login(estado) {
        this.estado = estado;
    }
    Login.prototype.ejecutar = function () {
        if (this.estado == true) {
            var nombre = document.getElementById("username").value;
            document.cookie = "username=" + nombre;
            window.location.href = '/dificultad';
            console.log(nombre);
        }
        return this.estado;
    };
    return Login;
}());
