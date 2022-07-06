import shell from 'shelljs'

import siigoShell, { ExitCode } from './siigoShell';

export function req() {

  if (!shell.which('git')) {
    shell.echo('Please install git. https://git-scm.com/downloads');
    shell.exit(ExitCode.FAIL);
  }

  if (!shell.which('az')) {
    shell.echo('Please install azure cli. https://docs.microsoft.com/en-us/cli/azure/install-azure-cli');
    shell.exit(ExitCode.FAIL);
  }

  if (!shell.which('node')) {
    shell.echo('Please install NodeJS. https://nodejs.org/en/download/');
    shell.exit(ExitCode.FAIL);
  } else {
    const minVersion = 16
    const version = siigoShell.exec('node -v').stdout
    const major = version.slice(
      version.indexOf('v') + 1,
      version.lastIndexOf('.'),
    );
    if (Number(major) < minVersion) {
      shell.echo(`Please install the NodeJS ${minVersion} or superior.`);
      shell.exit(ExitCode.FAIL);
    }
  }

}