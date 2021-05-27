const shell = require("shelljs")
const os = require("os");
const root = (os.platform == "win32") ? process.cwd().split(path.sep)[0] : "~/"
const pathHome = `${root}.siigo`;
function getParameter(parameter) {
    let temp = ""
    if(os.platform == "win32") shell.cp("~/.siigo",".siigo");
    if (shell.test('-f', pathHome)) {
        let listPar = shell.cat(pathHome).split("\n")
        listPar.forEach(ele => {if (ele.includes(parameter+"=")){ temp=ele}});
        let resul = temp.replace(parameter+"=","")
        if(resul=="\n" || resul=="") { resul = "pending" };
        return resul;
    }else{
        return "pending"
    }
}

const tknSiigo = getParameter("tkn") ;
const tkn64Siigo = getParameter("tkn64") ;
const userSiigo = getParameter("user") ;

module.exports = { tknSiigo, tkn64Siigo, userSiigo,pathHome};