import shell from 'shelljs'

export enum TOOLS {
    NONE = 'NONE',
    GIT = 'git',
    AZ = 'az',
    NODE = 'node',
    BUF = 'buf',
    TELEPRESENCE = 'telepresence',
    DOCKER = 'docker'
}

const TOOLS_LIST = new Map<TOOLS, string>([
    [TOOLS.GIT, 'https://git-scm.com/downloads'],
    [TOOLS.AZ, 'https://docs.microsoft.com/en-us/cli/azure/install-azure-cli'],
    [TOOLS.NODE, 'https://nodejs.org/en/download/'],
    [TOOLS.BUF, 'https://docs.buf.build/installation'],
    //[TOOLS.TELEPRESENCE, 'https://www.telepresence.io/docs/v1/reference/install/'],
    [TOOLS.DOCKER, 'https://docs.docker.com/engine/install/'],
])

export function toolsRequired(tools: TOOLS[]): any {
    const tool = tools.shift() || TOOLS.NONE

    const isTestEnv = process.env.NODE_ENV === 'test'
    const isNotToolOnList = !TOOLS_LIST.has(tool)

    if (isTestEnv || isNotToolOnList)
        return;

    const url = TOOLS_LIST.get(tool)

    if (!shell.which(tool)) {
        shell.echo(`Please install ${tool}. ${url}`);
        shell.exit(1);
    }

    return toolsRequired(tools);
}

export const req = () => toolsRequired([TOOLS.GIT, TOOLS.AZ, TOOLS.NODE, TOOLS.BUF, TOOLS.TELEPRESENCE])

