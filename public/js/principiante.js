//----------------------------------- configurar blockly-----------------------------
function configurarBlockly(){
    var workspacePlayground = Blockly.inject('blocklyDiv',
        {toolbox: document.getElementById('toolbox')});
}


//---------------------------------Funcion para cerrar sesion---------------------------------------------------
function getOut(){
    document.cookie = "username=;";
    window.location.href = '/';
}

/*---------------------------------------------------------------------------------------------------------------
------------------------------------------------- BLOCKLY PARA SQL----------------------------------------------- 
---------------------------------------------------------------------------------------------------------------*/

Blockly.defineBlocksWithJsonArray([
    //---------------------------------------------- SELECT----------------------------------------------------------
    {
        "type":"select",
        "message0" : "SELECT %1 FROM %2 ",
        "args0": [
            {
                "type" : "field_input",
                "name": "CAMPOS",
                "text": "*",
                "check" : "String"
            },
            {
                "type" : "field_input",
                "name": "TABLA",
                "text": "tablename",
                "check" : "String"
            }

        ],
        
    "previousStatement": null,
    "nextStatement": null,
    "colour": 355,
    "tooltip": "",
    "helpUrl": ""
    },
    
]);



