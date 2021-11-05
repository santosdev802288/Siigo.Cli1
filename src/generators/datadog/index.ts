import Generator =  require('yeoman-generator');
import colorize from 'json-colorizer'
import {req} from '../../utils/required-tools'
import {siigosay} from '@nodesiigo/siigosay'
import shell from 'shelljs'
import {registerAutocomplete } from '../../utils/autocomplete'
import { getParameter} from '../../utils/siigoFile'
import chalk from 'chalk'
import _ from 'lodash'
import path from 'path'

import {DashboardBuilder} from './templates/dashboard'
import {DashboardHandler} from './templates/dashboard.handler'
import { setFreeText, setSLOInfo } from './templates/dashboardInfo'
import { saveStatistic } from '../../utils/statistics/statistic';


const templatePath = 'datadog-sli'
const destinationPath = 'colombia/prod/datadog-sli'


interface DatadogOptions extends Generator.GeneratorOptions {
  'skip-install-step': boolean;
}


export default class DatadogGenerator extends Generator<DatadogOptions> {
  appConfig: any;
  answers: any;
  tribes: any;
  upgrade: any;
  token: any;
  branch: any;

  newFile = ''

  constructor(args: string, opt: DatadogOptions) {
    super(args, opt)

    req()
    saveStatistic(path.basename(__dirname))

    // optionals
    this.option('ms-name', {
      type: String,
      description: 'microservice name.',
    })

  }

  async initializing(): Promise<void> {
    this.log(siigosay('Siigo Generator Datadog.'))
    this.token = await getParameter('token')
    registerAutocomplete(this)
  }

  async prompting(): Promise<void> {

    const message = 'For more information execute yo siigo:datadog --help'

    if (!this.options['ms-name'] || this.options['ms-name'] === 'true')
      throw new Error('--ms-name is required or it should not be empty.\n ' + message)

    const tribe = await getParameter('tribe')
    this.appConfig = {
      microserviceName: this.options['ms-name'].toLowerCase(),
      tagTribu: tribe
    }

    const json = JSON.stringify(this.appConfig)
    this.log(colorize(json, {
      pretty: true,
      colors: {
        STRING_KEY: 'green',
        STRING_LITERAL: 'magenta.bold',
        NUMBER_LITERAL: '#FF0000'
      }
    }))

    this.answers = await this.prompt([
      {
        type: 'confirm',
        name: 'ready',
        message: 'Is the configuration correct?'
      }
    ])

    if (!this.answers.ready)
      this.cancelCancellableTasks()

    const dashboard = new DashboardBuilder('SLI - '+this.appConfig.tagTribu+' - CLI (Terraform)', 'Dashboard generado desde Siigo.Cli. ')

    const freeText1 = setFreeText(
      {
        layoutX: 16,
        layoutY: 1,
        definitionText: 'Métrica de errores http 5xx '
      }
    )

    const freeText2 = setFreeText(
      {
        layoutX: 78,
        layoutY: 1,
        definitionText: 'Métrica de Latencia '
      }
    )

    const slo1 = setSLOInfo({
      layoutX: 1,
      layoutY: 9,
      definitionSloId: 'dependency.datadog-slo-' + 
                        this.appConfig.microserviceName + 
                        '.outputs.metric_based_slo.ISIIGO' + 
                        this.appConfig.microserviceName + 
                        'CLI-Less-than-0_1-are-5xx-4xx-Terraform',
    })

    const slo2 = setSLOInfo({
      layoutX: 1,
      layoutY: 30,
      definitionSloId: 'dependency.datadog-slo-' + 
                        this.appConfig.microserviceName + 
                        '.outputs.metric_based_slo.ISIIGO' + 
                        this.appConfig.microserviceName + 
                        'CLI-Less-than-0_1-are-5xx-4xx-Terraform',
    })

    const slo3 = setSLOInfo({
      layoutX: 1,
      layoutY: 51,
      definitionSloId: 'dependency.datadog-slo-' + 
                        this.appConfig.microserviceName + 
                        '.outputs.metric_based_slo.ISIIGO' + 
                        this.appConfig.microserviceName + 
                        'CLI-Less-than-0_1-are-5xx-4xx-Terraform',
    })

    dashboard
      .setFreeText([freeText1.build(), freeText2.build()])
      .setSlos([slo1.build(), slo2.build(), slo3.build()])
      .setLayoutType('free')

    const dashboardHandler: DashboardHandler = new DashboardHandler(this.appConfig.microserviceName)

    dashboardHandler.addDashboard(dashboard.build())

    this.newFile = dashboardHandler.save(this.fs)
  }


  async writing(): Promise<void> {
    const mapObj: { [key: string]: string } = {
      tribe: this.appConfig.tagTribu.toLowerCase(),
      micro: this.appConfig.microserviceName
    }

    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(destinationPath),
      { config: this.appConfig },
      {},
      {
        processDestinationPath: (filePath) => filePath.replace(/(tribe|micro)/g, matched => mapObj[matched])
      },
    )

    this.fs.write(destinationPath + `/${mapObj.tribe}/dashboard/terragrunt.hcl`, this.newFile)
  }

  install(): void {

    if (this.options['skip-install-step']){
      return
    }
    shell.exec('git remote update origin --prune',{silent: true})
    const branchsGit = (shell.exec('git branch -r',{silent: true}).stdout).split('\n').filter(value => value.length)
    let flagDatadog = false
    this.branch = 'feature/'+this.appConfig.tagTribu.toLowerCase()+'/ms-'+this.appConfig.microserviceName+'/slo'
    if(branchsGit != null && !_.isEmpty(branchsGit)){
      branchsGit.forEach((branch: string) => { if(branch.includes(this.branch)) flagDatadog = true})
    }
    if(!flagDatadog){
      this.spawnCommandSync('git', ['checkout','-b',this.branch])
      this.spawnCommandSync('git', ['add','-A'])
      this.spawnCommandSync('git', ['commit','-m','creating slo configuration from Siigo CLI'])
      this.spawnCommandSync('git', ['push','origin',this.branch])
    }else{
      console.log(chalk.yellow('WARNING!!! '))
      console.log(chalk.yellow('The branch ' + this.branch + 'is already created!'))
    }
  }

  end(): void{
    this.log(siigosay('Enjoy! Dont forget merge' +this.branch+ 'branch in dev.'))
  }
}
