import shell from "shelljs"

export function req() {

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

}