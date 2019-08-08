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


Blockly.JavaScript['select'] = function(block) {
    console.log(block);
    var code = "SELECT ";
    if(block.childBlocks_.length > 0) code += getCampos(block.childBlocks_[0]) + "\n";
    code+= "FROM ";
    if(block.childBlocks_.length > 1) code += getTablas(block.childBlocks_[1]) + "\n";
    return code;
};

Blockly.JavaScript['campo'] = function(block) {
    var text = block.getFieldValue('campo');
    return [text];
};

//------------------------------------------------ concatena los campos de un select ------------------------------------------------------------
function getCampos(hijo){
  let code = hijo.getFieldValue("campo");
  if(hijo.childBlocks_.length > 0) code += "," + getCampos(hijo.childBlocks_[0]);
  return code;
}

//------------------------------------------------ concatena las tablas de un select ------------------------------------------------------------
function getTablas(hijo){
    let code = hijo.getFieldValue("campo");
    if(hijo.childBlocks_.length > 1) code += "," + getTablas(hijo.childBlocks_[1]);
    return code;
  }