//----------------------------------- configurar blockly-----------------------------
var workspacePlayground;
function configurarBlockly(){
     workspacePlayground = Blockly.inject('blocklyDiv',
        {toolbox: document.getElementById('toolbox')});
}


//---------------------------------Funcion para cerrar sesion---------------------------------------------------
function getOut(){
    document.cookie = "username=;";
    window.location.href = '/';
}

