/*
Blockly.Javascript['Tablas'] = function(block){
    console.log(block);
}
*/



function generarCodigo(){
    var code = Blockly.JavaScript.workspaceToCode(workspacePlayground);
    
    // now what do you do want to do with code...?
    console.log(code);
}

//--------------------------------------------------------------------- SELECT----------------------------------------------------------
Blockly.JavaScript['select'] = function(block) {
    var code = "\nSELECT ";

    //------------------------------------------------- CAMPOS EN SELECT --------------------------------------------------------------
    if(block.childBlocks_[0])
        code += getCampos(block.childBlocks_[0]);
    code += "\n";
    //-------------------------------------------------- CAMPOS DE FROM--------------------------------------------------------------------

    code+= "FROM ";
    if(block.childBlocks_[1]){
        if(block.childBlocks_[1].getFieldValue('campo')) code += getCampos(block.childBlocks_[1]) + "\n";
        else if(block.childBlocks_[1].getFieldValue('valor')) code +=  block.childBlocks_[1].getFieldValue('valor');
    }
    
    //-------------------------------------------------- WHERE -----------------------------------------------------------------------------
    if(block.childBlocks_[2]){
        code += "\nWHERE "; 
        if(block.childBlocks_[2].childBlocks_[0]) code += resolverOperacion(block.childBlocks_[2].childBlocks_[0]);
        
    }   
    code += ";";
    return code;
};
//---------------------------------------------------------------------- CAMPOS DE TEXTO---------------------------------------------------
Blockly.JavaScript['campo'] = function(block) {
    var text = block.getFieldValue('campo');
    return [text];
};

//----------------------------------------------------------------------- WHERE ---------------------------------------------------------------
Blockly.JavaScript['where'] = function(block){
    return "";
}

//----------------------------------------------------------------------- INSERT1 -----------------------------------------------
Blockly.JavaScript['insert1'] = function(block){
    let code = "\nINSERT INTO " + block.getFieldValue("TABLA") + " VALUES(";
    if(block.childBlocks_[0]) code += " " + getCampos(block.childBlocks_[0]);
    code += " );\n";
    return code;
}

//----------------------------------------------------------------------- INSERT2-------------------------------------------------
Blockly.JavaScript['insert2'] = function(block){
    let code = "\nINSERT INTO " + block.getFieldValue("TABLA") + " ( ";
    if(block.childBlocks_[0]) code += getCampos(block.childBlocks_[0]);
    code += " ) VALUES( ";
    if(block.childBlocks_[1]) code += getCampos(block.childBlocks_[1]);
    code += ");\n";
    return code;
}

//--------------------------------------------------------------------------- resolver las operaciones ---------------------------------------------------
function resolverOperacion(operacion){
    if(operacion.getFieldValue("valor")) return operacion.getFieldValue("valor");
    else if (operacion.getFieldValue("OPERA")){
        let opera1 = null;
        let opera2 = null;
        let operando = operacion.getFieldValue("OPERA");
        if(operacion.childBlocks_[0]) opera1 = resolverOperacion(operacion.childBlocks_[0]);
        if(operacion.childBlocks_[1]) opera2 = resolverOperacion(operacion.childBlocks_[1]);
        return opera1 + " " + operando + " " + opera2;
    }else if(operacion.getFieldValue("ARITMETICA")){
        let opera1 = null;
        let opera2 = null;
        let operando = operacion.getFieldValue("ARITMETICA");
        if(operacion.childBlocks_[0]) opera1 = resolverOperacion(operacion.childBlocks_[0]);
        if(operacion.childBlocks_[1]) opera2 = resolverOperacion(operacion.childBlocks_[1]);
        return opera1 + " " + operando + " " + opera2;
    }
    return "";
}

//-------------------------------------------------------------------- condiciones booleanas ---------------------------------------------------
Blockly.JavaScript['condicion'] = function(block){
    return "";
}

//------------------------------------------------------------- UPDATE ---------------------------------
Blockly.JavaScript['update'] = function(block){
    let code = "UPDATE " + block.getFieldValue("TABLA") + " SET ";
    if(block.childBlocks_[0]) code += getSet(block.childBlocks_[0]);
    //-------------------------------------------------- WHERE -----------------------------------------------------------------------------
    if(block.childBlocks_[1]){
        code += "\nWHERE "; 
        if(block.childBlocks_[1].childBlocks_[0]) code += resolverOperacion(block.childBlocks_[1].childBlocks_[0]);
        
    }   
    code += ";";
    return code;
}

//------------------------------------------------ concatena los campos de un select ------------------------------------------------------------
function getCampos(hijo){
  let code = "";
  if( hijo.getFieldValue("campo") ) code = hijo.getFieldValue("campo");
  else if( hijo.getFieldValue("valor") ) code = hijo.getFieldValue("valor");
  else if( hijo.getFieldValue("Tabla")){
    let tabla = hijo.getFieldValue('Tabla');
    let campo = hijo.getFieldValue('Campos');
    code = tabla + "." + campo;
  }
  if(hijo.childBlocks_[0])
    if(hijo.childBlocks_[0].getFieldValue("campo") || hijo.childBlocks_[0].getFieldValue("valor") || hijo.childBlocks_[0].getFieldValue('Tabla') ) code += "," + getCampos(hijo.childBlocks_[0]);
  
    

  return code;
}

//------------------------------------------------- regresar un set a un update -----------------------------------------------
function getSet(nodo){
    let code = "";
    if(nodo.getFieldValue("campoUpdate")){
        let campo = nodo.getFieldValue("campoUpdate");
        let valor = nodo.getFieldValue("valorUpdate");

        code += campo + " = " + valor;

        if(nodo.childBlocks_[0]) code += ",\n" + getSet(nodo.childBlocks_[0]);
    }
    return code;
}


//--------------------------------------------------------- set-----------------------------------
Blockly.JavaScript['set'] = function(block){
    return "";
}

//------------------------------------------------ concatena las tablas de un select ------------------------------------------------------------
function getTablas(hijo){
    let code = hijo.getFieldValue("campo");
    if(hijo.childBlocks_.length > 1) code += "," + getTablas(hijo.childBlocks_[1]);
    return code;
  }