const shell = require("shelljs")
const os = require("os");
const root = (os.platform == "win32") ? process.cwd().split(path.sep)[0] : "~/"
const pathHome = `${root}.siigo`;
const prompt = require('prompt');
var colors = require("colors/safe");

async function wizardsiigofile(updatetoken) {
    let token = ""
    if(updatetoken != undefined){
        token = updatetoken;
        shell.rm(pathHome)
    }else{
        prompt.message = colors.green("siigo.cli")
        this.answers = await prompt.get(['personaltkn']);
        token = this.answers.personaltkn;
    }
    shell.touch(pathHome);
    shell.exec(`echo tkn=${token} >> ${pathHome}`)
    let b64 =Buffer.from(token.trim()).toString('base64')
    shell.exec(`echo tkn64=${b64} >> ${pathHome}`)
    const resUser  = shell.exec('az account show | json user.name', {silent:true}).stdout
    shell.exec(`echo user=${resUser.replace("\n","")} >> ${pathHome}`)
    return token;
}

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
        return "pending";
    }
}

const tknSiigo = getParameter("tkn") ;
const tkn64Siigo = getParameter("tkn64") ;
const userSiigo = getParameter("user") ;

module.exports = { tknSiigo, tkn64Siigo, userSiigo,pathHome,wizardsiigofile};
