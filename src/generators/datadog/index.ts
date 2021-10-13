import Generator =  require('yeoman-generator');
import colorize from 'json-colorizer'
import {req} from '../../utils/required-tools'
import {siigosay} from '@nodesiigo/siigosay'
import shell from 'shelljs'
import {registerAutocomplete } from '../../utils/autocomplete'
import { getParameter} from '../../utils/siigoFile'
import chalk from 'chalk'
import _ from 'lodash'

import {DashboardBuilder} from './templates/dashboard'
import {DashboardHandler} from './templates/dashboard.handler'
import { setFreeText, setSLOInfo } from './templates/dashboardInfo'


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

  constructor(args: any, opt: DatadogOptions) {
    super(args, opt)

    req()

    // optionals

    this.option('ms-name', {
      type: String,
      description: 'microservice name.',
    })

  }

  async initializing() {
    this.log(siigosay('Siigo Generator Datadog.'))
    this.token = await getParameter('token')
    registerAutocomplete(this)
  }

  async prompting() {

    const message = 'For more information execute yo siigo:datadog --help'

    if (!this.options['ms-name'] || this.options['ms-name'] === 'true')
      throw new Error('--ms-name is required or it should not be empty.\n ' + message)

    console.log('Obteniendo la ultima version de Chart!')
    let resGit: any = (shell.exec('git ls-remote --refs --tags --sort=v:refname https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Chart',
      {silent: true}).stdout).split('/').pop()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resGit = resGit.replace('\n','')

    const tribe = await getParameter('tribe')
    this.appConfig = {
      microserviceName: this.options['ms-name'].toLowerCase(),
      tagTribu: tribe
    }

    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    const json = JSON.stringify(this.appConfig, false, '\t')
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
          definitionSloId: 'dependency.datadog-slo-'+this.appConfig.microserviceName+'.outputs.metric_based_slo.ISIIGO'+this.appConfig.microserviceName+'CLI-Less-than-0_1-are-5xx-4xx-Terraform',
      })

      const slo2 = setSLOInfo({
          layoutX: 1,
          layoutY: 30,
          definitionSloId: 'dependency.datadog-slo-'+this.appConfig.microserviceName+'.outputs.metric_based_slo.ISIIGO'+this.appConfig.microserviceName+'CLI-Less-than-0_1-are-5xx-4xx-Terraform',
      })

      const slo3 = setSLOInfo({
          layoutX: 1,
          layoutY: 51,
          definitionSloId: 'dependency.datadog-slo-'+this.appConfig.microserviceName+'.outputs.metric_based_slo.ISIIGO'+this.appConfig.microserviceName+'CLI-Less-than-0_1-are-5xx-4xx-Terraform',
      })

    dashboard
      .setFreeText([freeText1.build(), freeText2.build()])
      .setSlos([slo1.build(), slo2.build(), slo3.build()])
      .setLayoutType('free')

    const dashboardHandler: DashboardHandler = new DashboardHandler(this.appConfig.microserviceName)

    dashboardHandler.addDashboard(dashboard.build())

    dashboardHandler.save()
  }


  async writing(): Promise<void> {

    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(destinationPath),
      { config: this.appConfig },
      {},
      {
        processDestinationPath: (filePath) => {
          const mapObj = {
            tribe: this.appConfig.tagTribu.toLowerCase(),
            micro: this.appConfig.microserviceName
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return filePath.replace(/(tribe|micro)/g, matched => mapObj[matched])
        }
      },
    )
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

  end(){
    this.log(siigosay('Enjoy! Dont forget merge' +this.branch+ 'branch in dev.'))
  }
}
