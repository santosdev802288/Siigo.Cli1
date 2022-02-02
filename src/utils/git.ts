import shell from 'shelljs';


/**
 * Check if has a remote.
 * 
 * @param remoteName 
 */
export function remoteExists(remoteName?: string): boolean {
  const output = shell.exec(`git ls-remote --exit-code ${remoteName}`, {silent: true})
  if(output.code !== 0){
    console.error(output.stdout)
    return false;
  }
  return true
}

