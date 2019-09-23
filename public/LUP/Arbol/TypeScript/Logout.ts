class Logout{
    estado:boolean;
    
    constructor(estado:boolean){
        this.estado = estado;
    }

    ejecutar(){
        if(this.estado){
            document.cookie = "username=;";
            window.location.href = '/';
        }
        return this.estado;
    }
}