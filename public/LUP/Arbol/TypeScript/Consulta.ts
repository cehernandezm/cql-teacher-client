class Consulta{
    data : string;
    constructor(data:string){
        this.data = data;
    }

    ejecutar(){
        (window as any).nuevaConsulta(this.data);
        return "";
    }
}