import _ from 'lodash'
import shelljs from 'shelljs'
import assert from 'yeoman-assert'

/**
 * Check if the .Net project has deprecated, vulnerable or outdated packages.
 */
export function assertNoOutdatedPackages() {
  const siigoFeed = 'https://pkgs.dev.azure.com/SiigoDevOps/Siigo/_packaging/nuget.siigo.com/nuget/v3/index.json'
  const outdated = `dotnet list package --outdated --source ${siigoFeed}`

  const commands: { [key: string]: string[]; } = {
    'Deprecated': ['dotnet list package --deprecated', '>'],
    'Vulnerable': ['dotnet list package --vulnerable', '>'],
    'Outdated Siigo': [outdated, '> Siigo'],
  }

  Object.entries(commands).forEach(([key, [command, regEx]]) => {
    const result = shelljs.exec(command, { fatal: true, silent: true }).grep('--', regEx)
    const output = result.stdout.trim()
    assert.ok(_.isEmpty(output), `${key}: \n"${output}"`)
  })
}

/**
 * Run "dotnet build"
 */
export function dotnetBuild() {
  shelljs.exec('dotnet build', { fatal: true, silent: true })
}


