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

//--------------------------------- bases-----------------------------------------------------------------------
var campos1 = [["*","*"],["titulo1","titulo1"]];
var campos2 = [["*","*"],["titulo2","titulo2"]];

var tablas = [
    {
        "nombre" : "Tabla1",
        "campos" : campos1
    },
    {
        "nombre" : "Tabla2",
        "campos" : campos2
    }
];

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



//------------------------------------------ TABLAS --------------------------------------------------------------
Blockly.Blocks['Tablas'] = {
    init: function(){
        var defaultlist = [ ["Tabla1","Tabla1" ], ["Tabla2","Tabla2" ] ];
        var defaultlist2 = [ ["*","*" ] ];
        if(tablas.length > 0) defaultlist2 = tablas[0].campos
        
        this.setColour(122);
        this.appendDummyInput('dropDownField')
        .appendField(new Blockly.FieldDropdown(defaultlist), 'Tabla');
        
        this.appendDummyInput('dropDownField2')   
        .appendField(new Blockly.FieldDropdown(defaultlist2), 'Campos');       
        var thisBlock = this;
    },
    onchange : function(e){
        //---------------- que si cambio un campo y no fue un click
        if(e.element === "field" ){
            //------------------- lo que cambio fue una tabla y no un campo
            if(e.name === "Tabla"){
                var dropdown = this.getInput('dropDownField').fieldRow[0];
                var segunda = buscarListas(dropdown.value_);
                if(segunda){
                    try{
                        this.removeInput('dropDownField2');
                        this.appendDummyInput('dropDownField2').appendField(
                            new Blockly.FieldDropdown(segunda), 'String');
                    }catch (ee) { } 
                }
            }
        }
    } 
}

function buscarListas(nombre){
    for(let i = 0; i < tablas.length; i++){
        if(tablas[i].nombre === nombre) return tablas[i].campos;
    }
    return null;
}