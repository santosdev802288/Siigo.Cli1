const shell = require("shelljs")

module.exports = () => {

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

    if (!shell.test('-f', '~/.siigo')) {
        rl.question('Please enter token: ', (tkn) => {
            rl.question('Please enter siigo user: ', (user) => {
                shell.touch('~/.siigo');
                shell.exec(`echo tkn=${tkn} >> ~/.siigo`)
                let b64 =Buffer.from(tkn.trim()).toString('base64')
                shell.exec(`echo tkn64=${b64} >> ~/.siigo`)
                shell.exec(`echo user=${user} >> ~/.siigo`)
                rl.close();
            });
        });
    }else{
        const grepRes = shell.grep('user=', '~/.siigo')
        if(grepRes.stdout=="\n" ||grepRes.stdout=="" ){
            rl.question('Please enter siigo user: ', (user) => {
                shell.exec(`echo user=${user} >> ~/.siigo`)
                rl.close();
            });
        }else{
            rl.close();
        }
    }
}