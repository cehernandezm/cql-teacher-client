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

//--------------------------------------------------- WHERE --------------------------------------------------------------
Blockly.Blocks["where"] = {
  init: function() {
    this.appendValueInput("WHERE")
      .setCheck(null)
      .appendField("WHERE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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

function buscarListas(nombre) {
  for (let i = 0; i < tablas.length; i++) {
    if (tablas[i].nombre === nombre) return tablas[i].campos;
  }
  return null;
}
