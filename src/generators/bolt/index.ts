import os  from 'os'
import path  from 'path'
import colorize from'json-colorizer'
import {siigosay} from'@nodesiigo/siigosay'
import {MicroserviceGenerator} from '../../utils/generator/microservice'
import { getAllParametersSiigo, wizardsiigofile } from '../../utils/siigoFile'
import { saveStatistic } from '../../utils/statistics/statistic'
import shell from 'shelljs'
import { isTestEnv } from '../../utils/environment/node';
import chalk from 'chalk'


export default class GolangMSGenerator {

    appConfig: { description?: any; author?: any; name?: any; token?: any; auth?: any; redis?: any; email?: any } = {}

    constructor(args: any, opt: any) {
        
        saveStatistic('bolt')
        // optionals

        console.log(chalk.bgRed(`command bold has been deprecated use instead siigo:golang`))
    
    }
}

MicroserviceGenerator.yeomanInheritance(GolangMSGenerator)
