import shell from "shelljs";
import os from "os";
import path from 'path';
import prompt from 'prompt';
import colors from "colors/safe";
import { tribeByUser } from './readTribes';

const root = (os.homedir());
export const pathHome = path.join(root, '.siigo');


export async function wizardsiigofile(updatetoken: any) {
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
    const answers = await prompt.get(['personaltoken'])
    const personaltoken = String(answers.personaltoken)
    setSiigofile(personaltoken)
    return personaltoken
}

function setSiigofile(token: string){
    shell.touch(pathHome)
    shell.exec(`echo token=${token} >> ${pathHome}`)
    let b64 =Buffer.from(token.trim()).toString('base64')
    shell.exec(`echo token64=${b64} >> ${pathHome}`)
    let resUser  = JSON.parse(shell.exec('az account show', {silent:true}).stdout).user.name
    resUser = resUser.replace("\n","").replace(" \r","")
    shell.exec(`echo user=${resUser} >> ${pathHome}`) 
    setTribeAndNameByUser(resUser);
}

export async function getParameter(parameter: any) {
    let temp = "";
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

export async function setParameter(parameter: any, value: any) {
    if (shell.test('-f', pathHome)) {
        shell.exec(`sed -i -e 's/${parameter}=.*/${parameter}=${value}/g' ${pathHome}`)
        if(parameter=="token") {
            let b64 =Buffer.from(value.trim()).toString('base64')
            shell.exec(`sed -i -e 's/${parameter+"64"}=.*/${parameter+"64"}=${b64}/g' ${pathHome}`)
        }
    }
}

export async function setTribeAndNameByUser(resUser: any) {
    const {tribe, name}  = await tribeByUser(resUser)
    if (shell.test('-f', pathHome)) {
        if(shell.exec(`grep -q "name=" ${pathHome} ; echo $?`, {silent:true}).code == 0){
            shell.exec(`sed -i -e 's/name=.*/name=${name}/g' ${pathHome}`)
            shell.exec(`sed -i -e 's/tribe=.*/tribe=${tribe}/g' ${pathHome}`)
        }else{
            shell.exec(`echo name=${name} >> ${pathHome}`)
            shell.exec(`echo tribe=${tribe} >> ${pathHome}`)
        }
        return {tribe, name}
    }
}

