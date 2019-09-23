function codigoLogout(user){
    return "[+LOGOUT]\n\t[+USER]\n\t\t" + user + "\n\t[-USER]\n[-LOGOUT]";
}

function codigoConsulta(codigo,user){
    return "[+QUERY]\n[+USER]\n\t" + user + "\n[-USER]\n[+DATA]\n\t" + codigo + "\n[-DATA]\n[-QUERY]"
}