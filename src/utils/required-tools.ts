import shell from 'shelljs'

export enum TOOLS {
    GIT = 'git',
    AZ = 'az',
    NODE = 'node',
    BUF = 'buf',
    TELEPRESENCE = 'telepresence',
    DOCKER = 'docker'
}

const tools = new Map<TOOLS, string>([
    [TOOLS.GIT, 'https://git-scm.com/downloads'],
    [TOOLS.AZ, 'https://docs.microsoft.com/en-us/cli/azure/install-azure-cli'],
    [TOOLS.NODE, 'https://nodejs.org/en/download/'],
    [TOOLS.BUF, 'https://docs.buf.build/installation'],
    [TOOLS.TELEPRESENCE, 'https://www.telepresence.io/docs/v1/reference/install/'],
    [TOOLS.DOCKER, 'https://docs.docker.com/engine/install/'],
])

export function toolsRequired(tool: TOOLS) {

    if (!tools.has(tool))
        return toolsRequired

    const url = tools.get(tool)

    if (!shell.which(tool)) {
        shell.echo(`Please install ${tool}. ${url}`);
        shell.exit(1);
    }

    return toolsRequired
}

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

    if (!shell.which('buf')) {
        shell.echo('Please install Buf. https://docs.buf.build/installation');
        shell.exit(1);
    }

    if (!shell.which('telepresence')) {
        shell.echo('Please install Telepresence. https://www.telepresence.io/docs/v1/reference/install/');
        shell.exit(1);
    }

}