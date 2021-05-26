const shell = require("shelljs")
const readline = require('readline');
const path = require("path");
const os = require("os");
const root = (os.platform == "win32") ? process.cwd().split(path.sep)[0] : "~/"

module.exports = () => {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    const pathHome = `${root}.siigo`;

    if (!shell.which('git')) {
        shell.echo('Please install git. https://git-scm.com/downloads');
        shell.exit(1);
    }

    if (!shell.which('az')) {
        shell.echo('Please install azure cli. https://docs.microsoft.com/en-us/cli/azure/install-azure-cli');
        shell.exit(1);
    }

    if (!shell.which('node')) {
        shell.echo('Please install NodeJS. https://nodejs.org/en/download/');
        shell.exit(1);
    }

    if (!shell.test('-f', "~/.siigo")) {
        rl.question('Please enter token: ', (tkn) => {
            rl.question('Please enter siigo user: ', (user) => {
                shell.touch(pathHome);
                shell.exec(`echo tkn=${tkn} >> ${pathHome}`)
                let b64 =Buffer.from(tkn.trim()).toString('base64')
                shell.exec(`echo tkn64=${b64} >> ${pathHome}`)
                shell.exec(`echo user=${user} >> ${pathHome}`)
                rl.close();
            });
        });
    }else{
        if(os.platform == "win32") shell.cp("~/.siigo",".siigo");
        const grepRes = shell.grep('user=', pathHome)
        if(grepRes.stdout=="\n" ||grepRes.stdout=="" ){
            rl.question('Please enter siigo user: ', (user) => {
                shell.exec(`echo user=${user} >> ${pathHome}`)
                rl.close();
            });
        }else{
            rl.close();
        }
    }
}