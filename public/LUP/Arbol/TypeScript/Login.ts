class Login{
    estado : Boolean;
    constructor(estado : Boolean){
        this.estado = estado;
    }

    ejecutar() {
        if(this.estado == true){
            var nombre:string = (<HTMLInputElement> document.getElementById("username")).value;
            document.cookie = "username=" + nombre;
            window.location.href = '/dificultad'
            console.log(nombre);
        } 
        return this.estado;
    }

}