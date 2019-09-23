class Mensaje{
    mensaje : string;
    constructor(mensaje:string){
        this.mensaje = mensaje;
    }

    ejecutar(){
        (<HTMLInputElement>document.getElementById("console-body-consola")).innerHTML += 
        "<p style = \"color:white;\">" + this.mensaje + "</p>";
        return "";
    }
}