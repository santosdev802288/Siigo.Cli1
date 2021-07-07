import shell from "shelljs";
import os from "os";
import path from 'path';
import prompt from 'prompt';
import colors from "colors/safe";
import { tribeByUser } from './readTribes';

const root = (os.homedir());
export const pathHome = path.join(root, '.siigo');


export async function wizardsiigofile(updatetoken: any) {
    let token = "";
    if (updatetoken != undefined) {
        token = updatetoken;
        shell.rm(pathHome);
    }
    else {
        (prompt as any).message = colors.green("siigo.cli");
        const answers = await prompt.get(['personaltoken']);
        token = String(answers.personaltoken);
    }
    shell.touch(pathHome);
    shell.exec(`echo token=${token} >> ${pathHome}`);
    let b64 = Buffer.from(token.trim()).toString('base64');
    shell.exec(`echo token64=${b64} >> ${pathHome}`);
    let resUser = JSON.parse(shell.exec('az account show', { silent: true }).stdout).user.name;
    resUser = resUser.replace("\n", "").replace(" \r", "");
    shell.exec(`echo user=${resUser} >> ${pathHome}`);
    setTribeAndNameByUser(resUser);
    return token;
}

export function getParameter(parameter: any) {
    let temp = "";
    if (os.platform() == "win32")
        shell.cp("~/.siigo", ".siigo");
    if (shell.test('-f', pathHome)) {
        let listPar = shell.cat(pathHome).split("\n");
        listPar.forEach((ele: any) => { if (ele.includes(parameter + "=")) {
            temp = ele;
        } });
        let resul = temp.replace(parameter + "=", "");
        if (resul == "\n" || resul == "") {
            resul = "pending";
        }
        return resul.replace("\n", "").replace(" \r", "").replace("\r", "");
    }
    else {
        return "pending";
    }
}

export async function setParameter(parameter: any, value: any) {
    if (os.platform() === 'win32')
        shell.cp("~/.siigo", ".siigo");
    if (shell.test('-f', pathHome)) {
        shell.exec(`sed -i -e 's/${parameter}=.*/${parameter}=${value}/g' ~/.siigo`);
        if (parameter == "token") {
            let b64 = Buffer.from(value.trim()).toString('base64');
            console.log(b64);
            shell.exec(`sed -i -e 's/${parameter + "64"}=.*/${parameter + "64"}=${b64}/g' ~/.siigo`);
        }
    }
}

export async function setTribeAndNameByUser(resUser: any) {
    const { tribe, name } = await tribeByUser(resUser);
    shell.exec(`echo name=${name} >> ${pathHome}`);
    shell.exec(`echo tribe=${tribe} >> ${pathHome}`);
    return { tribe, name };
}

export const tokenSiigo = getParameter("token");
export const token64Siigo = getParameter("token64");
export const userSiigo = getParameter("user");
export const nameDev = getParameter("name");
export const tribeSiigo = getParameter("tribe");
