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
       ;

mensajeError : CORIZQ MAS ERROR CORDER CORIZQ MAS LINE CORDER ENTERO CORIZQ MENOS LINE CORDER
               CORIZQ MAS COLUMN CORDER ENTERO CORIZQ MENOS COLUMN CORDER CORIZQ MAS TYPE
               CORDER CUERPO CORIZQ MENOS TYPE CORDER CORIZQ MAS DESC CORDER cuerpo
               CORIZQ MENOS DESC CORDER CORIZQ MENOS ERROR CORDER                                   {$$ = new MensajesError($36,$27,$9,$18);}
               ;   

cuerpo : cuerpo CUERPO                              {$$ = $1 + "\n" + $2}
       | CUERPO                                     {$$ = $1}
       ;

%%

parser.arbol = {
    raiz: null
};