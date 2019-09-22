//--------------------------------- bases-----------------------------------------------------------------------
var campos1 = [["*", "*"], ["titulo1", "titulo1"]];
var campos2 = [["*", "*"], ["titulo2", "titulo2"]];

var tablas = [
  {
    nombre: "Tabla1",
    campos: campos1
  },
  {
    nombre: "Tabla2",
    campos: campos2
  }
];

/*---------------------------------------------------------------------------------------------------------------
------------------------------------------------- BLOCKLY PARA CQL----------------------------------------------- 
---------------------------------------------------------------------------------------------------------------*/

//--------------------------------------- SELECT ----------------------------------------------------------------

Blockly.Blocks["select"] = {
  init: function() {
    this.appendValueInput("SELECT")
      .setCheck("String")
      .appendField("SELECT");
    this.appendValueInput("FROM")
      .setCheck(null)
      .appendField("FROM");
    this.setNextStatement(true, null);
    this.setPreviousStatement(true, null);
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.setColour(230);
    this.setOutput(false, null);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//---------------------------------------- SELECT WHERE ---------------------------------------------------------
Blockly.Blocks["select2"] = {
  init: function() {
    this.appendValueInput("SELECT")
      .setCheck("String")
      .appendField("SELECT");
    this.appendValueInput("FROM")
      .setCheck(null)
      .appendField("FROM");
    this.appendValueInput("WHERE")
      .setCheck(null)
      .appendField("WHERE");
    this.appendStatementInput("cuerpo")
      .setCheck(null);
    this.setNextStatement(true, null);
    this.setPreviousStatement(true, null);
    this.setColour(230);
    this.setOutput(false, null);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//------------------------------------------ TABLAS --------------------------------------------------------------
Blockly.Blocks["Tablas"] = {
  init: function() {
    var defaultlist = [["Tabla1", "Tabla1"], ["Tabla2", "Tabla2"]];
    var defaultlist2 = [["*", "*"]];
    if (tablas.length > 0) defaultlist2 = tablas[0].campos;

    this.setColour(122);
    this.appendDummyInput("dropDownField").appendField(
      new Blockly.FieldDropdown(defaultlist),
      "Tabla"
    );

    this.appendDummyInput("dropDownField2").appendField(
      new Blockly.FieldDropdown(defaultlist2),
      "Campos"
    );

    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  },
  onchange: function(e) {
    //---------------- que si cambio un campo y no fue un click
    if (e.element === "field") {
      //------------------- lo que cambio fue una tabla y no un campo
      if (e.name === "Tabla") {
        var dropdown = this.getInput("dropDownField").fieldRow[0];
        var segunda = buscarListas(dropdown.value_);
        if (segunda) {
          try {
            this.removeInput("dropDownField2");
            this.appendDummyInput("dropDownField2").appendField(
              new Blockly.FieldDropdown(segunda),
              "String"
            );
          } catch (ee) {}
        }
      }
    }
  }
};

//------------------------------------------------------- campos de texto-------------------------------------------------
Blockly.Blocks["campo"] = {
  init: function() {
    this.appendValueInput("VALUE")
      .setCheck("String")
      .appendField(new Blockly.FieldTextInput("*"), "campo");
    this.setOutput(true, "String");
    this.setColour(65);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//-------------------------------------------------- CONDICIONES ----------------------------------------------------------
Blockly.Blocks["condicion"] = {
  init: function() {
    this.appendValueInput("Op1")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_CENTRE);
    this.appendValueInput("op2")
      .setCheck(null)
      .appendField(
        new Blockly.FieldDropdown([
          [">", ">"],
          ["<", "<"],
          ["==", "=="],
          ["<=", "<="],
          ["!=", "!="],
          [">=", ">="]
        ]),
        "OPERA"
      );
    this.setOutput(true, null);
    this.setColour(200);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//-------------------------------------------------- CONDICIONES ----------------------------------------------------------
Blockly.Blocks["operaciones"] = {
    init: function() {
      this.appendValueInput("Op1")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE);
      this.appendValueInput("op2")
        .setCheck(null)
        .appendField(
          new Blockly.FieldDropdown([
            ["+", "+"],
            ["-", "-"],
            ["*", "*"],
            ["/", "/"],
          ]),
          "ARITMETICA"
        );
      this.setOutput(true, null);
      this.setColour(200);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };


//-------------------------------------------------- valor puntual -----------------------------------------------------
Blockly.Blocks["valor"] = {
  init: function() {
    this.appendDummyInput().appendField(
      new Blockly.FieldTextInput("valor"),
      "valor"
    );
    this.setOutput(true, null);
    this.setColour(65);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


//------------------------------------------------- INSERT INTO TABLA VALUES() -----------------------------------------------------
Blockly.Blocks['insert1'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("INSERT INTO")
        .appendField(new Blockly.FieldTextInput("TABLA"), "TABLA");
    this.appendValueInput("WHERE")
        .setCheck(null)
        .appendField("VALUES (");
    this.appendDummyInput()
        .appendField(")");
    this.setColour(230);
 this.setTooltip("");
 this.setPreviousStatement(true, null);
 this.setNextStatement(true, null);
 this.setHelpUrl("");
  }
};

//------------------------------------------------ INSERT INTO TABLA() VALUES()------------------------------------------------
Blockly.Blocks['insert2'] = {
  init: function() {
    this.appendValueInput("INSERT")
        .setCheck(null)
        .appendField("INSERT INTO")
        .appendField(new Blockly.FieldTextInput("TABLA"), "TABLA")
        .appendField("(");
    this.appendDummyInput();
    this.appendValueInput("VALUES")
        .setCheck(null)
        .appendField(") VALUES(");
    this.appendDummyInput()
        .appendField(")");
    this.setColour(230);
 this.setTooltip("");
 this.setPreviousStatement(true, null);
 this.setNextStatement(true, null);
 this.setHelpUrl("");
  }
};

//--------------------------------------------------- UPDATE --------------------------------------------------------------------
Blockly.Blocks['update'] = {
  init: function() {
    this.appendValueInput("UPDATE")
        .setCheck(null)
        .appendField("UPDATE")
        .appendField(new Blockly.FieldTextInput("TABLA"), "TABLA")
        .appendField("SET");
    this.appendDummyInput();
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setPreviousStatement(true, null);
 this.setNextStatement(true, null);
 this.setHelpUrl("");
  }
};

//--------------------------------------------------- UPDATE --------------------------------------------------------------------
Blockly.Blocks['update2'] = {
  init: function() {
    this.appendValueInput("UPDATE")
        .setCheck(null)
        .appendField("UPDATE")
        .appendField(new Blockly.FieldTextInput("TABLA"), "TABLA")
        .appendField("SET");
    this.appendDummyInput();
    this.appendValueInput("WHERE")
      .setCheck(null)
      .appendField("WHERE");
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setPreviousStatement(true, null);
 this.setNextStatement(true, null);
 this.setHelpUrl("");
  }
};


//----------------------------------------------------- SET ----------------------------------
Blockly.Blocks['set'] = {
  init: function() {
    this.appendValueInput("UPDATE")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput("campo"), "campoUpdate")
        .appendField("=")
        .appendField(new Blockly.FieldTextInput("valor"), "valorUpdate");
    this.setOutput(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

//----------------------------------------------------- DELETE -------------------------------------------------------------------

Blockly.Blocks['delete'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("DELETE FROM")
        .appendField(new Blockly.FieldTextInput("TABLA"), "TABLA");
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setPreviousStatement(true, null);
 this.setNextStatement(true, null);
 this.setHelpUrl("");
  }
};

//----------------------------------------------------- DELETE2 -------------------------------------------------------------------

Blockly.Blocks['delete2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("DELETE FROM")
        .appendField(new Blockly.FieldTextInput("TABLA"), "TABLA");
    this.appendValueInput("WHERE")
        .setCheck(null)
        .appendField("WHERE");   
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setPreviousStatement(true, null);
 this.setNextStatement(true, null);
 this.setHelpUrl("");
  }
};


//--------------------------------------- ORDER BY  ----------------------------------------------------------------
Blockly.Blocks['orderby'] = {
  init: function() {
    this.appendValueInput("ID")
        .setCheck(null)
        .appendField("ORDER BY");
    this.appendDummyInput();
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

//--------------------------------------- LIMIT  ----------------------------------------------------------------
Blockly.Blocks['limit'] = {
  init: function() {
    this.appendValueInput("ID")
        .setCheck(null)
        .appendField("LIMIT ");
    this.appendDummyInput();
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


//--------------------------------------- USE  ----------------------------------------------------------------
Blockly.Blocks['use'] = {
  init: function() {
    this.appendValueInput("ID")
        .setCheck(null)
        .appendField("USE");
    this.appendDummyInput();
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



function buscarListas(nombre) {
  for (let i = 0; i < tablas.length; i++) {
    if (tablas[i].nombre === nombre) return tablas[i].campos;
  }
  return null;
}


/*--------------------------------------------------------- INTERMEDIO ------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------*/

Blockly.Blocks['declaracion'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("Tipo"), "Tipo")
        .appendField("@")
        .appendField(new Blockly.FieldTextInput("Nombre"), "Nombre")
        .appendField(";");
    this.setColour(290);
 this.setTooltip("");
 this.setPreviousStatement(true, null);
 this.setNextStatement(true, null);
 this.setHelpUrl("");
  }
};

Blockly.Blocks['asignacion'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("Nombre"), "Nombre")
        .appendField("=");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(";");
    this.setColour(290);
 this.setTooltip("");
 this.setPreviousStatement(true, null);
 this.setNextStatement(true, null);
 this.setHelpUrl("");
  }
};

Blockly.Blocks['if'] = {
  init: function() {
    this.appendValueInput("condicion")
        .setCheck(null)
        .appendField("If");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.setNextStatement(true, null);
    this.setColour(189);
 this.setTooltip("");
 this.setPreviousStatement(true, null);
 this.setNextStatement(true, null);
 this.setHelpUrl("");
  }
};

Blockly.Blocks['elseif'] = {
  init: function() {
    this.appendValueInput("condicion")
        .setCheck(null)
        .appendField("else if");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.setNextStatement(true, null);
    this.setColour(189);
 this.setTooltip("");
 this.setPreviousStatement(true, null);
 this.setNextStatement(true, null);
 this.setHelpUrl("");
  }
};

Blockly.Blocks['else'] = {
  init: function() {
    this.appendStatementInput("cuerpo")
        .setCheck(null)
        .appendField("else");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(189);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['switch'] = {
  init: function() {
    this.appendValueInput("condicion")
        .setCheck(null)
        .appendField("switch");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.appendStatementInput("default")
        .setCheck(null)
        .appendField("default");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(189);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['case'] = {
  init: function() {
    this.appendValueInput("condicion")
        .setCheck(null)
        .appendField("case");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(189);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['while'] = {
  init: function() {
    this.appendValueInput("condicion")
        .setCheck(null)
        .appendField("while");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(189);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['dowhile'] = {
  init: function() {
    this.appendStatementInput("cuerpo")
        .setCheck(null)
        .appendField("do");
    this.appendValueInput("condicion")
        .setCheck(null)
        .appendField("while");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(189);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['for'] = {
  init: function() {
    this.appendValueInput("condicion")
        .setCheck(null)
        .appendField("for ")
        .appendField(new Blockly.FieldTextInput("inicializacion"), "inicializacion")
        .appendField("condicion:");
    this.appendStatementInput("NAME")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput("actualizacion"), "actualizacion");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(189);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['metodo'] = {
  init: function() {
    this.appendValueInput("condicion")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput("nombre"), "nombre")
        .appendField(" ( parametros");
    this.appendDummyInput()
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['funcion'] = {
  init: function() {
    this.appendValueInput("condicion")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput("nombre"), "nombre")
        .appendField(" ( parametros");
    this.appendDummyInput()
        .appendField(")");
    this.setOutput(true, null);
    this.setColour(90);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};