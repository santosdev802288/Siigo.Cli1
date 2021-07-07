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
    if(updatetoken != null){
        token = updatetoken
        if (shell.test('-f', pathHome)) shell.rm(pathHome)
        setSiigofile(token)
        return token
    }else{
        token = await typingToken()
        return token
    }
}

async function typingToken(){
    prompt.message = colors.green("siigo.cli")
    this.answers = await prompt.get(['personaltoken'])
    setSiigofile(this.answers.personaltoken)
    return this.answers.personaltoken
}

function setSiigofile(token){
    shell.touch(pathHome)
    shell.exec(`echo token=${token} >> ${pathHome}`)
    let b64 =Buffer.from(token.trim()).toString('base64')
    shell.exec(`echo token64=${b64} >> ${pathHome}`)
    let resUser  = JSON.parse(shell.exec('az account show', {silent:true}).stdout).user.name
    resUser = resUser.replace("\n","").replace(" \r","")
    shell.exec(`echo user=${resUser} >> ${pathHome}`) 
    setTribeAndNameByUser(resUser);
}

async function getParameter(parameter) {
    let temp = ""
    if (shell.test('-f', pathHome)) {
        if(os.platform == "win32") shell.cp("~/.siigo",".siigo")
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
        shell.exec(`sed -i -e 's/${parameter}=.*/${parameter}=${value}/g' ${pathHome}`)
        if(parameter=="token") {
            let b64 =Buffer.from(value.trim()).toString('base64')
            shell.exec(`sed -i -e 's/${parameter+"64"}=.*/${parameter+"64"}=${b64}/g' ${pathHome}`)
        }
    }
}

async function setTribeAndNameByUser(resUser){
    const {tribe, name}  = await tribeByUser(resUser)
    if (shell.test('-f', pathHome)) {
        if(shell.exec(`grep -q "name=" ${pathHome} ; echo $?`, {silent:true}).code == 0){
            shell.exec(`sed -i -e 's/name=.*/name=${name}/g' ${pathHome}`)
            shell.exec(`sed -i -e 's/tribe=.*/tribe=${tribe}/g' ${pathHome}`)
        }else{
            shell.exec(`echo name=${name} >> ${pathHome}`)
            shell.exec(`echo tribe=${tribe} >> ${pathHome}`)
        }
        if(os.platform == "win32") shell.cp("~/.siigo",".siigo")
        return {tribe, name}
    }
}

module.exports = {pathHome,wizardsiigofile,getParameter,setParameter,setTribeAndNameByUser }
