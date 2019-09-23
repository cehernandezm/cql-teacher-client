class MensajesError {
    mensaje: string;
    tipo: string;
    l: number;
    c: number;

    constructor(mensaje: string, tipo: string, l: number, c: number) {
        this.mensaje = mensaje;
        this.tipo = tipo;
        this.l = l;
        this.c = c;
    }

    ejecutar(){
        (<HTMLInputElement>document.getElementById("console-body-consola")).innerHTML += 
        "<p style = \"color:red;\">" + this.tipo + ": " + this.mensaje + ",Linea: " + this.l + ",Columna: " + this.c + "</p>";
        return "";
    }
}