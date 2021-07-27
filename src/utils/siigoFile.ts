import shell from 'shelljs';
import os from 'os';
import path from 'path';
import prompt from 'prompt';
import { tribeByUser } from './readTribes';
import { exec } from 'child_process';
const root = (os.homedir());
export const pathHome = path.join(root, '.siigo');
import fs from 'fs';

interface SiigoParameter {
    'token'?: string, 'token64'?: string, 'user'?: string, 'name'?: string, 'tribe'?: string,
}

async function writeSiigoFile(payload: any){
    await fs.writeFileSync(pathHome, payload);
}
async function readSiigoFile():Promise<any>{    
    const siigoFile = await fs.readFileSync(pathHome,'utf8');
    return siigoFile
}

/**
 * Return all the current params saved on .siigo file
 * 
 * @returns siigoParams
 */
export async function getAllParametersSiigo(): Promise<SiigoParameter> {
    const parameters: (keyof SiigoParameter)[] = ['token', 'token64', 'user', 'name', 'tribe'];
    const objParameters: SiigoParameter = {};
    await Promise.all(parameters.map(async (element) => {
        try {
            objParameters[element] = await getParameter(element);
        } catch (error) {
            console.log('error'+ error);
        }
    }))
    return objParameters;
}

/**
 * Update or ask for token on .siigo file
 * 
 * @param updatetoken 
 * @returns 
 */
export async function wizardsiigofile(updatetoken?: string): Promise<string> {
    let token = ''
    if(updatetoken != null){
        token = updatetoken
        if (fs.existsSync(pathHome)) fs.unlinkSync(pathHome)
        await setSiigofile(token)
        return token
    }else{
        token = await typingToken()
        return token
    }
}

async function typingToken(){
    prompt.message = 'siigo.cli'
    const answers = await prompt.get(['personaltoken'])
    const personaltoken = String(answers.personaltoken)
    setSiigofile(personaltoken)
    return personaltoken
}

async function setSiigofile(token: string){
    const b64 =Buffer.from(token.trim()).toString('base64')
    let resUser = ''
    if(os.platform()=='win32'){
        resUser = JSON.parse(shell.exec('az account show', {silent:true}).stdout).user.name
    }else {
        exec('az account show', {'shell':'powershell.exe'}, (error, stdout, stderr)=> {resUser = JSON.parse(stdout).user.name})
    }
    const { name, tribe } = await tribeByUser(resUser)
    const payload = `token=${token}\ntoken64=${b64}\nuser=${resUser}\nname=${name}\ntribe=${tribe}`
    await writeSiigoFile(payload)
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getParameter(parameter: keyof SiigoParameter) {
    let temp = '';
    if (fs.existsSync(pathHome)) {
        let listPar = await readSiigoFile();
        listPar = listPar.split('\n')
        listPar.forEach((ele: any) => {if (ele.includes(parameter+'=')){ temp=ele}})
        let resul = temp.replace(parameter+'=','')
        if(resul=='\n' || resul=='') { resul = 'pending' }
        return resul.replace('\n','').replace(' \r','').replace('\r','');
    }else {
        return 'pending'
    }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function setParameter(parameter: any, value: any) {
    if (fs.existsSync(pathHome)) {
        let payload = await readSiigoFile() 
        // eslint-disable-next-line no-useless-escape
        const regpa = new RegExp(`${parameter}=\w+`);
        payload = payload.replace(regpa,`${parameter}=${value}`)
        if(parameter=='token') {
            // eslint-disable-next-line no-useless-escape
            const regpa64 = new RegExp(`${parameter}64=\w+`);
            payload = payload.replace(regpa64,`${parameter}64=${value}`)
        }
        await writeSiigoFile(payload)
    }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function setTribeAndNameByUser(resUser: string) {
    const {tribe, name}  = await tribeByUser(resUser)
    if (fs.existsSync(pathHome)) {
        let payload = await readSiigoFile() 
        payload = payload.replace(/name=\w+/,`name=${name}`)
        payload = payload.replace(/tribe=\w+/,`tribe=${tribe}`)
        await writeSiigoFile(payload)
    }
    return {tribe, name}
}

