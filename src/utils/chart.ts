import fetch, {RequestInit} from 'node-fetch'
import fs from 'fs'
import path from 'path'

import _ from 'lodash'
import shell from 'shelljs'
import {load, dump} from 'js-yaml';


/**
 * Fetch values file from Siigo.Chart repository and write to ./.docker/${projectName}/values.yaml.
 *
 * @param token
 * @param projectName Project chart folder name.
 * @param tagOwner
 * @param tagTribu
 * @param tagGroup
 */
export async function writeChart(token: string, projectName: string, tagOwner: string, tagTribu: string, tagGroup: string, type: string): Promise<void> {
  const b64 = Buffer.from(token.trim() + ':').toString('base64')
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + b64,
    },
    redirect: 'follow'
  }
  const url = 'https://dev.azure.com/SiigoDevOps/Siigo/_apis/git/repositories/Siigo.Chart/items?path=/ChartOps/values.yaml&download=true&api-version=6.0'
  const response = await fetch(url, requestOptions)
  let stringResponse: string = await response.text()

  const chartValuesAsJson = load(stringResponse) as any

  chartValuesAsJson.labels.tags.datadoghq.com.tribu = tagTribu
  chartValuesAsJson.labels.tags.datadoghq.com.owner = tagOwner
  chartValuesAsJson.labels.tags.datadoghq.com.group = tagGroup

  if (type === 'golang') {
    chartValuesAsJson.envs['GO_ENV'] = 'Development'
  } else {
    chartValuesAsJson.envs['ASPNETCORE_ENVIRONMENT'] = 'Development'
  }

  try {

    const valuesPath = path.resolve(`./.docker/${projectName}/values.yaml`)
    const qaValuesPath = path.resolve('./.docker/envs/qa.yaml')
    const prodValuesPath = path.resolve('./.docker/envs/prod.yaml')
    const prodstValuesPath = path.resolve('./.docker/envs/prodst.yaml')
    const sandboxValuesPath = path.resolve('./.docker/envs/sandbox.yaml')

    stringResponse = dump({'siigo-chart': chartValuesAsJson})

    fs.writeFileSync(valuesPath, stringResponse)
    fs.writeFileSync(qaValuesPath, stringResponse)
    fs.writeFileSync(prodValuesPath, stringResponse)
    fs.writeFileSync(prodstValuesPath, stringResponse)
    fs.writeFileSync(sandboxValuesPath, stringResponse)
  } catch (err) {
    console.log(err)
    console.error('No se pudo escribir el archivo values.yaml')
  }
}


export function lastChartVersion(): string {
  const command = 'git ls-remote --refs --tags --sort=v:refname https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Chart'
  const resGit = (shell.exec(command, {silent: true}).stdout).split('/').pop()
  return _.defaultTo(resGit, '0.2.23').replace('\n', '')
}
