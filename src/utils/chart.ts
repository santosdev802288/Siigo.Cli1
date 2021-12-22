import fetch, { RequestInit } from 'node-fetch'
import fs from 'fs'
import path from 'path'

import _ from 'lodash'
import shell from 'shelljs'

/**
 * Fetch values file from Siigo.Chart repository and write to ./.docker/${projectName}/values.yaml.
 * 
 * @param token 
 * @param projectName Project chart folder name.
 * @param tagOwner 
 * @param tagTribu 
 * @param tagGroup 
 */
export async function writeChart(token:string, projectName:string, tagOwner:string, tagTribu: string, tagGroup: string): Promise<void> {
  const b64 = Buffer.from(token.trim() + ':').toString('base64')
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + b64,
    },
    redirect: 'follow'
  }
  const url = 'https://dev.azure.com/SiigoDevOps/Siigo/_apis/git/repositories/Siigo.Chart/items?path=values.yaml&download=true&api-version=6.0'
  const response = await fetch(url, requestOptions)
  let stringResponse:string = await response.text()
  stringResponse = stringResponse.replace('com: {}',
    `com:
      tribu: ${tagTribu}
      owner: ${tagOwner}
      group: ${tagGroup}`)
  
  const valuesPath = path.resolve(`./.docker/${projectName}/values.yaml`)
  try {
    fs.writeFileSync(valuesPath, stringResponse)
  }
  catch (err) {
    console.log(err)
    console.error(`No se pudo escribir el archivo ${valuesPath}`)
  }
}

export function lastChartVersion(): string {
  const command = 'git ls-remote --refs --tags --sort=v:refname https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Chart'
  const resGit = (shell.exec(command, {silent: true}).stdout).split('/').pop()
  return _.defaultTo(resGit, '0.2.19').replace('\n','')
}
