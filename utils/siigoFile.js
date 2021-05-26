const shell = require("shelljs")

function getParameter(parameter) {
    let temp = ""
    let listPar = shell.cat("~/.siigo").split("\n")
    listPar.forEach(ele => {if (ele.includes(parameter+"=")){ temp=ele}});
    return temp.replace(parameter+"=","");
}

const tknSiigo = getParameter("tkn") ;
const tkn64Siigo = getParameter("tkn64") ;
const userSiigo = getParameter("user") ;


module.exports = { tknSiigo, tkn64Siigo, userSiigo};