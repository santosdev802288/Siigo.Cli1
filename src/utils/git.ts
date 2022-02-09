import shell from 'shelljs';

/**
 * Check if the command run successfully, and log the output on fail.
 * 
 * @param command 
 * @returns 
 */
function execAndChek(command: string): boolean{
  const output = shell.exec(command, {silent: true})
  if(output.code !== 0){
    console.error(output.stdout)
    return false;
  }
  return true
}

/**
 * Check if there are any local unstaged changes
 * 
 * @returns 
 */
export function hasUnstagedChanges(): boolean {
  return execAndChek('git diff --exit-code')
}

/**
 * Check if the process is running on a local git repository.
 * 
 * @returns 
 */
export function isInsideGitRepo(): boolean {
  return execAndChek('git rev-parse --is-inside-work-tree')
}

/**
 * Check if the repo has a remote.
 * 
 * @param remoteName Name of the remote, default is "origin"
 */
export function remoteExists(remoteName = 'origin'): boolean {
  return execAndChek(`git remote get-url ${remoteName}`)
}

