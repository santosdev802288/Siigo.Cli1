const shell = require("shelljs")
const os = require("os")
const path = require('path')
const root = (os.homedir())
const pathHome = path.join(root, '.siigo')
const prompt = require('prompt')
var colors = require("colors/safe")
const {tribeByUser } = require('./readTribes')

async function wizardsiigofile(updatetoken) {
    let token = ""
    if(updatetoken != undefined){
        token = updatetoken
        shell.rm(pathHome)
    }else{
        prompt.message = colors.green("siigo.cli")
        this.answers = await prompt.get(['personaltoken'])
        token = this.answers.personaltoken
    }
    shell.touch(pathHome)
    shell.exec(`echo token=${token} >> ${pathHome}`)
    let b64 =Buffer.from(token.trim()).toString('base64')
    shell.exec(`echo token64=${b64} >> ${pathHome}`)
    let resUser  = JSON.parse(shell.exec('az account show', {silent:true}).stdout).user.name
    resUser = resUser.replace("\n","").replace(" \r","")
    shell.exec(`echo user=${resUser} >> ${pathHome}`) 
    setTribeAndNameByUser(resUser);
    return token
}

function getParameter(parameter) {
    let temp = ""
    if(os.platform == "win32") shell.cp("~/.siigo",".siigo")
    if (shell.test('-f', pathHome)) {
        let listPar = shell.cat(pathHome).split("\n")
        listPar.forEach(ele => {if (ele.includes(parameter+"=")){ temp=ele}})
        let resul = temp.replace(parameter+"=","")
        if(resul=="\n" || resul=="") { resul = "pending" }
        return resul.replace("\n","").replace(" \r","").replace("\r","");
    }else {
        return "pending"
    }
}
async function setParameter(parameter,value) {
    if(os.platform == "win32") shell.cp("~/.siigo",".siigo")
    if (shell.test('-f', pathHome)) {
        shell.exec(`sed -i -e 's/${parameter}=.*/${parameter}=${value}/g' ~/.siigo`)
    }
}

async function setTribeAndNameByUser(resUser){
    const {tribe, name}  = await tribeByUser(resUser)
    shell.exec(`echo name=${name} >> ${pathHome}`)
    shell.exec(`echo tribe=${tribe} >> ${pathHome}`)
    return {tribe, name}
}
const tokenSiigo =  getParameter("token") 
const token64Siigo =  getParameter("token64") 
const userSiigo = getParameter("user") 
const nameDev = getParameter("name") 
const tribeSiigo = getParameter("tribe")

module.exports = { tokenSiigo,token64Siigo,userSiigo,nameDev,tribeSiigo,pathHome,wizardsiigofile,getParameter,setParameter,setTribeAndNameByUser }
