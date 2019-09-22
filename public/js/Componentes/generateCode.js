/*
Blockly.Javascript['Tablas'] = function(block){
    console.log(block);
}
*/



function generarCodigo(){
    var code = Blockly.JavaScript.workspaceToCode(workspacePlayground);
    console.log(code);
}

//--------------------------------------------------------------------- SELECT----------------------------------------------------------
Blockly.JavaScript['select'] = function(block) {
    var code = "SELECT ";
    let condicion = Blockly.JavaScript.valueToCode(block, 'SELECT', Blockly.JavaScript.ORDER_ATOMIC);
    code += condicion +"\n";
    //-------------------------------------------------- CAMPOS DE FROM--------------------------------------------------------------------

    let tabla = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_ATOMIC);
    code+= "FROM " + tabla;

    let cuerpo  = Blockly.JavaScript.statementToCode(block, 'cuerpo');
    code += "\n" + cuerpo + ";\n";
    return code;
};

//--------------------------------------------------------------------- SELECT 2----------------------------------------------------------
Blockly.JavaScript['select2'] = function(block) {
    var code = "SELECT ";
    let condicion = Blockly.JavaScript.valueToCode(block, 'SELECT', Blockly.JavaScript.ORDER_ATOMIC);
    code += condicion +"\n";
    //-------------------------------------------------- CAMPOS DE FROM--------------------------------------------------------------------

    let tabla = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_ATOMIC);
    code += "FROM " + tabla +"\n";

    let condicion2  = Blockly.JavaScript.valueToCode(block, 'WHERE', Blockly.JavaScript.ORDER_ATOMIC);
    code += "WHERE " + condicion2 ;

    let cuerpo  = Blockly.JavaScript.statementToCode(block, 'cuerpo');
    code += "\n" + cuerpo + ";\n";
    return code;
};


//----------------------------------------------------------------------- INSERT1 -----------------------------------------------
Blockly.JavaScript['insert1'] = function(block){
    let code = "INSERT INTO " + block.getFieldValue("TABLA") + " VALUES(";
    let valores  = Blockly.JavaScript.valueToCode(block, 'WHERE', Blockly.JavaScript.ORDER_ATOMIC);
    code += valores + ");\n";
    return code;
}

//----------------------------------------------------------------------- INSERT2-------------------------------------------------
Blockly.JavaScript['insert2'] = function(block){
    let code = "INSERT INTO " + block.getFieldValue("TABLA") + " (";
    let campos  = Blockly.JavaScript.valueToCode(block, 'INSERT', Blockly.JavaScript.ORDER_ATOMIC);
    code += campos + ") VALUES(";
    let valores  = Blockly.JavaScript.valueToCode(block, 'VALUES', Blockly.JavaScript.ORDER_ATOMIC);
    code += valores + ");\n";
    return code;
}




//------------------------------------------------------------- UPDATE ---------------------------------
Blockly.JavaScript['update'] = function(block){
    let code = "UPDATE " + block.getFieldValue("TABLA") + " SET ";
    let valores  = Blockly.JavaScript.valueToCode(block, 'UPDATE', Blockly.JavaScript.ORDER_ATOMIC);
    code += valores + ";\n";
    return code;
}

//------------------------------------------------------------- UPDATE 2---------------------------------
Blockly.JavaScript['update2'] = function(block){
    let code = "UPDATE " + block.getFieldValue("TABLA") + " SET ";
    let valores  = Blockly.JavaScript.valueToCode(block, 'UPDATE', Blockly.JavaScript.ORDER_ATOMIC);
    let condicion = Blockly.JavaScript.valueToCode(block, 'WHERE', Blockly.JavaScript.ORDER_ATOMIC);
    code += valores + "\nWHERE " + condicion + ";\n";
    return code;
}


//----------------------------------------------------- DELETE --------------------------------------------
Blockly.JavaScript['delete'] = function(block){
    let code = "DELETE FROM " + block.getFieldValue("TABLA");
    code += ";\n";
    return code;
}

//----------------------------------------------------- DELETE2 --------------------------------------------
Blockly.JavaScript['delete2'] = function(block){
    let code = "DELETE FROM " + block.getFieldValue("TABLA") + "\n";
    let condicion = Blockly.JavaScript.valueToCode(block, 'WHERE', Blockly.JavaScript.ORDER_ATOMIC);
    code += "WHERE " + condicion +";\n";
    return code;
}





//---------------------------------------------------- regresar un valor --------------------------------------------------
Blockly.JavaScript['valor'] = function(block){
    return [block.getFieldValue("valor"),Blockly.JavaScript.ORDER_ATOMIC];
}

//--------------------------------------------------------- retorna los valores de un campo -------------------------------------------
Blockly.JavaScript['campo'] = function(block) {
    let valor = block.getFieldValue("campo");
    let con = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
    if(con) valor += ", " + con;
    return [valor,Blockly.JavaScript.ORDER_ATOMIC];
};

//------------------------------------------------------------ Regresa tabla y campo -----------------------------------------------------
Blockly.JavaScript['Tablas'] = function(block){
    let code = "";
    let tabla = block.getFieldValue('Tabla');
    let campo = block.getFieldValue('Campos');
    code = tabla + "." + campo;
    return [code,Blockly.JavaScript.ORDER_ATOMIC];
}

//------------------------------------------------------- CONDICION <,>.... ------------------------------------------------
Blockly.JavaScript['condicion'] = function(block){
    let operando = block.getFieldValue("OPERA");
    let opera1 = Blockly.JavaScript.valueToCode(block, 'Op1', Blockly.JavaScript.ORDER_ATOMIC);
    let opera2 = Blockly.JavaScript.valueToCode(block, 'op2', Blockly.JavaScript.ORDER_ATOMIC);
    let code = opera1 + " " + operando + " " + opera2;
    return [code,Blockly.JavaScript.ORDER_NONE];
}

//---------------------------------------------------------- RESOLVER OPERACIONES -------------------------------------------
Blockly.JavaScript['operaciones'] = function(block){
    let operando = block.getFieldValue("ARITMETICA");
    let opera1 = Blockly.JavaScript.valueToCode(block, 'Op1', Blockly.JavaScript.ORDER_ATOMIC);
    let opera2 = Blockly.JavaScript.valueToCode(block, 'op2', Blockly.JavaScript.ORDER_ATOMIC);
    let code = opera1 + " " + operando + " " + opera2;
    return [code,Blockly.JavaScript.ORDER_NONE];
}

//----------------------------------------------------------- Para update ----------------------------------------------------
Blockly.JavaScript['set'] = function(block){
    let campo = block.getFieldValue("campoUpdate");
    let valor = block.getFieldValue("valorUpdate");
    let codigo = campo + " = " + valor;
    let con = Blockly.JavaScript.valueToCode(block, 'UPDATE', Blockly.JavaScript.ORDER_ATOMIC);
    if(con) codigo += ",\n" + con;
    return [codigo,Blockly.JavaScript.ORDER_ATOMIC];
}



/*------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------- NIVEL INTERMEDIO ----------------------------------------------------------------------------- 
------------------------------------------------------------------------------------------------------------------------------------------------*/

//------------------------------------------------------- FUNCION PARA MOSTRAR EL CODIGO EN TIEMPO REAL ------------------------------------------

function showCode(event){
    var code = Blockly.JavaScript.workspaceToCode(workspacePlayground);
    ed.getDoc().setValue(code);
}

Blockly.JavaScript['declaracion'] = function(block){
  let tipo = block.getFieldValue("Tipo");
  let nombre = block.getFieldValue("Nombre");
  return  tipo + " @" + nombre + ";\n";  
}

Blockly.JavaScript['asignacion'] = function(block){
    let nombre = block.getFieldValue("Nombre");

    let valor = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    return nombre + " = " + valor +";\n";
}

Blockly.JavaScript['if'] = function(block){
    let condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
    var cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
    return "if (" + condicion + ") {\n " + cuerpo + "}\n";
}

Blockly.JavaScript['elseif'] = function(block){
    let condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
    var cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
    return "else if (" + condicion + ") {\n " + cuerpo + "}\n";
}

Blockly.JavaScript['else'] = function(block){
    var cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
    return "else{\n " + cuerpo + "}\n";
}

Blockly.JavaScript['switch'] = function(block){
    let condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
    let cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
    let cuerpod = Blockly.JavaScript.statementToCode(block, 'default');
    return "switch (" + condicion + ") {\n " + cuerpo +"\ndefault:\n" + cuerpod + "}\n";
}

Blockly.JavaScript['case'] = function(block){
    let condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
    let cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
    return "case " + condicion + ":{\n " + cuerpo +"\nbreak;\n}\n";
}

Blockly.JavaScript['while'] = function(block){
    let condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
    let cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
    return "while (" + condicion + "){\n " + cuerpo +"}\n";
}

Blockly.JavaScript['dowhile'] = function(block){
    let condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
    let cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
    return "do {\n" + cuerpo + "while(" + condicion + " );\n";
}

Blockly.JavaScript['for'] = function(block){
    let inicializacion = block.getFieldValue("inicializacion");
    let actualizacion = block.getFieldValue("actualizacion");
    let condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
    let cuerpo = Blockly.JavaScript.statementToCode(block, 'NAME');
    return "for(" +inicializacion + "; " + condicion + "; " + actualizacion + "){\n" + cuerpo +"}\n";
}

Blockly.JavaScript['metodo'] = function(block){
    let nombre = block.getFieldValue("nombre");
    let condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
    return nombre + "(" + condicion + ");\n";
}

Blockly.JavaScript['funcion'] = function(block){
    let nombre = block.getFieldValue("nombre");
    let condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
    return [nombre + "(" + condicion + ")",Blockly.JavaScript.ORDER_ATOMIC];
}


Blockly.JavaScript['orderby'] = function(block){
    let nombres = Blockly.JavaScript.valueToCode(block, 'ID', Blockly.JavaScript.ORDER_ATOMIC);
    return "ORDER BY " + nombres ;
}

Blockly.JavaScript['limit'] = function(block){
    let nombres = Blockly.JavaScript.valueToCode(block, 'ID', Blockly.JavaScript.ORDER_ATOMIC);
    return "LIMIT " + nombres ;
}

Blockly.JavaScript['use'] = function(block){
    let nombres = Blockly.JavaScript.valueToCode(block, 'ID', Blockly.JavaScript.ORDER_ATOMIC);
    return "USE " + nombres + ";" ;
}