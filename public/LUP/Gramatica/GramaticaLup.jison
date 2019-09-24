%lex

%options case-insensitive

%%
[ \r\t\n]+                                  {}
[0-9]+                                      return 'ENTERO'
"["                                         return 'CORIZQ'
"]"                                         return 'CORDER'
"+"                                         return 'MAS'
"-"                                         return 'MENOS' 
"LOGIN"                                     return 'LOGIN'
"LOGOUT"                                    return 'LOGOUT'
"FAIL"                                      return 'FAIL'
"SUCCESS"                                   return 'SUCCESS'
"ERROR"                                     return 'ERROR'
"LINE"                                      return 'LINE'
"COLUMN"                                    return 'COLUMN'
"TYPE"                                      return 'TYPE'
"DESC"                                      return 'DESC'
"MESSAGE"                                   return 'MESSAGE'
"DATA"                                      return 'DATA'
"DATABASES"                                 return 'DATABASES'
"DATABASE"                                  return 'DATABASE'
"NAME"                                      return 'NAME'
"TABLES"                                    return 'TABLES'
"TABLE"                                     return 'TABLE'
"COLUMNS"                                   return 'COLUMNS'
"COLUMN"                                    return 'COLUMN'
"TYPES"                                     return 'TYPES'
"TYPE"                                      return 'TYPE'
"ATTRIBUTES"                                return 'ATTRIBUTES'
"ATTRIBUTE"                                 return 'ATTRIBUTE'
"PROCEDURES"                                return 'PROCEDURES'
"PROCEDURE"                                 return 'PROCEDURE'
((?!(\[(\+|\-))).+)                         return 'CUERPO'
<<EOF>>                                     {}
.					                        { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

%start inicio
%%

/*
* ANALISIS SINTACTICO
*/

inicio : instrucciones               { parser.arbol.raiz = $1; $$ = $1;  }
       | error                       { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); };

instrucciones : inLogin              {$$ = []; $$.push($1);}
              | inLogout             {$$ = []; $$.push($1);}
              | datas                {$$ = $1;}
              ;

inLogin : CORIZQ MAS LOGIN CORDER CORIZQ SUCCESS CORDER CORIZQ MENOS LOGIN CORDER      { $$ = new Login(true);}
        | CORIZQ MAS LOGIN CORDER CORIZQ FAIL CORDER CORIZQ MENOS LOGIN CORDER         { $$ = new Login(false);};

inLogout : CORIZQ MAS LOGOUT CORDER CORIZQ SUCCESS CORDER CORIZQ MENOS LOGOUT CORDER      { $$ = new Logout(true);}
         | CORIZQ MAS LOGOUT CORDER CORIZQ FAIL CORDER CORIZQ MENOS LOGOUT CORDER         { $$ = new Logout(false);}
         ;

datas : datas data              {$$ = $1; $$.push($2)}
      | data                    {$$ = []; $$.push($1)}
      ;

data : mensajeError             {$$ = $1}
     | mensaje                  {$$ = $1}
     | consulta                 {$$ = $1}
     | allData                  {$$ = $1}  
     ;

mensajeError : CORIZQ MAS ERROR CORDER CORIZQ MAS LINE CORDER ENTERO CORIZQ MENOS LINE CORDER
               CORIZQ MAS COLUMN CORDER ENTERO CORIZQ MENOS COLUMN CORDER CORIZQ MAS TYPE
               CORDER CUERPO CORIZQ MENOS TYPE CORDER CORIZQ MAS DESC CORDER cuerpo
               CORIZQ MENOS DESC CORDER CORIZQ MENOS ERROR CORDER                                   {$$ = new MensajesError($36,$27,$9,$18);}
             ;   

mensaje : CORIZQ MAS MESSAGE CORDER cuerpo CORIZQ MENOS MESSAGE CORDER                              {$$ = new Mensaje($5);}
        ;


consulta : CORIZQ MAS DATA CORDER cuerpo CORIZQ MENOS DATA CORDER                                   {$$ = new Consulta($5);}
         ;


cuerpo : cuerpo CUERPO                              {$$ = $1 + "\n" + $2}
       | CUERPO                                     {$$ = $1}
       ;

allData : indatabases                               {$$ = new Estructura({bases: $1});}
        ;

indatabases : CORIZQ MAS DATABASES CORDER databases CORIZQ MENOS DATABASES CORDER               {$$ = $5;}
            | CORIZQ MAS DATABASES CORDER  CORIZQ MENOS DATABASES CORDER                        {$$ = [];}
            ;

databases : databases database                      {$$= $1; $$.push($2);}
          | database                                {$$ = []; $$.push($1);}
          ;

database : CORIZQ MAS DATABASE CORDER name  elementos  CORIZQ MENOS DATABASE CORDER               {$$ = {name:$5,objetos:$6};}
         | CORIZQ MAS DATABASE CORDER name  CORIZQ MENOS DATABASE CORDER                        {$$ = {name:$5,tablas:[]};}
         ;

elementos : elementos inTablas                      {$$ = $1; $$.push({tipo: "tabla", data : $2});}
          | elementos inProcedures                  {$$ = $1; $$.push({tipo: "procedur", data : $2});}
          | elementos inTypes                       {$$ = $1; $$.push({tipo: "type", data : $2});}
          | inTablas                                {$$ = []; $$.push({tipo: "tabla", data : $1});}
          | inTypes                                 {$$ = []; $$.push({tipo: "type", data : $1});}
          | inProcedures                            {$$ = []; $$.push({tipo: "procedur", data : $1});}
          ;

inTypes : CORIZQ MAS TYPES CORDER types CORIZQ MENOS TYPES CORDER                           {$$ = $5;}
        | CORIZQ MAS TYPES CORDER CORIZQ MENOS TYPES CORDER                                 {$$ = [];}
        ;

types : types type                                              {$$ = $1; $$.push($2);}
      | type                                                    {$$ = []; $$.push($1);}
      ;


type : CORIZQ MAS TYPE CORDER name inAtributo CORIZQ MENOS TYPE CORDER                          {$$ = {name: $5, atributos: $6};}
     ;




inAtributo : CORIZQ MAS ATTRIBUTES CORDER atributos CORIZQ MENOS ATTRIBUTES CORDER               {$$ = $5}
           ;

atributos : atributos atributo                                              {$$ = $1; $$.push($2);}
          | atributo                                                        {$$ = []; $$.push($1);}
          ;

atributo : CORIZQ MAS ATTRIBUTE CORDER CUERPO CORIZQ MENOS ATTRIBUTE CORDER                       {$$ = $5}
         ;

inTablas : CORIZQ MAS TABLES CORDER tablas CORIZQ MENOS TABLES CORDER                           {$$ = $5;}
         | CORIZQ MAS TABLES CORDER CORIZQ MENOS TABLES CORDER                                  {$$ = [];}
         ;


tablas : tablas tabla                               {$$ = $1; $$.push($2);}
       | tabla                                      {$$ = []; $$.push($1);}
       ;

tabla : CORIZQ MAS TABLE CORDER name inColumnas CORIZQ MENOS TABLE CORDER           {$$ = {name: $5, columnas: $6 };}
      ;


inColumnas : CORIZQ MAS COLUMNS CORDER columnas CORIZQ MENOS COLUMNS CORDER         {$$ = $5}
           ;


columnas : columnas columna                            {$$ = $1; $$.push($2);}
         | columna                                     {$$ = []; $$.push($1);}
         ;

columna : CORIZQ MAS COLUMN CORDER CUERPO CORIZQ MENOS COLUMN CORDER               {$$ = $5;}
        ;


inProcedures : CORIZQ MAS PROCEDURES CORDER procedures CORIZQ MENOS PROCEDURES CORDER           {$$ = $5;}
             | CORIZQ MAS PROCEDURES CORDER  CORIZQ MENOS PROCEDURES CORDER                     {$$ = [s];}
             ;

procedures : procedures procedure                   {$$ = $1; $$.push($2);}
           | procedure                              {$$ = []; $$.push($1);}
           ;

procedure : CORIZQ MAS PROCEDURE CORDER CUERPO CORIZQ MENOS PROCEDURE CORDER            {$$ = $5;}
          ;

name : CORIZQ MAS NAME CORDER CUERPO CORIZQ MENOS NAME CORDER                            {$$ = $5;}
     ;

%%

parser.arbol = {
    raiz: null
};