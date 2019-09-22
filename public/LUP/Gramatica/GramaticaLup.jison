%lex

%options case-insensitive

%%
[ \r\t\n]+                                  {}
"["                                         return 'CORIZQ'
"]"                                         return 'CORDER'
"+"                                         return 'MAS'
"-"                                         return 'MENOS' 
"LOGIN"                                     return 'LOGIN';
"FAIL"                                      return 'FAIL';
"SUCCESS"                                   return 'SUCCESS';
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

instrucciones : inLogin              {$$ = []; $$.push($1);};

inLogin : CORIZQ MAS LOGIN CORDER CORIZQ SUCCESS CORDER CORIZQ MENOS LOGIN CORDER      { $$ = new Login(true);}
        | CORIZQ MAS LOGIN CORDER CORIZQ FAIL CORDER CORIZQ MENOS LOGIN CORDER         { $$ = new Login(false);};

%%

parser.arbol = {
    raiz: null
};