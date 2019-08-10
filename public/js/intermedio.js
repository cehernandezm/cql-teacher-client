//----------------------------------- configurar blockly-----------------------------
var workspacePlayground;
function configurarBlockly(){
     workspacePlayground = Blockly.inject('blocklyDiv',
        {toolbox: document.getElementById('toolbox')});
    
    workspacePlayground.addChangeListener(showCode);
}


//---------------------------------Funcion para cerrar sesion---------------------------------------------------
function getOut(){
    document.cookie = "username=;";
    window.location.href = '/';
}

