import path from 'path';
import Generator = require('yeoman-generator');
import rename from 'gulp-rename';
import {exec as spawn} from 'child_process';
import colorize from 'json-colorizer';
import _ from 'lodash';
import {siigosay} from '@nodesiigo/siigosay'

import { saveStatistic } from '../../utils/statistics/statistic';
import { lastChartVersion } from '../../utils/chart';
import { getParameter } from '../../utils/siigoFile';
import { verifyNewVersion } from '../../utils/notification';
import siigoShell, { ExitCode } from '../../utils/siigoShell';


interface AppConfig {
    organization: any; 
    project: any; 
    environment: any;
    name: string;
    namespace: any; 
    folder: any; 
    port: any; 
    pipelineName: string; 
    chartVersion: any;
    owner: {
      user: string;
      tribe: string;
    },
    repo: {
      url: string
    }
}

export default class GatewayGenerator extends Generator {
  appConfig: AppConfig = {} as AppConfig;
  answers: any;

  constructor(args: any, opt: any) {
    super(args, opt);
    saveStatistic('gateway')
    verifyNewVersion()

    const currentPath = path.basename(process.cwd())
        
    // optionals
    this.option('organization', {
      type: String,
      description: 'Url of the organization in azure devops.',
      default: 'https://dev.azure.com/SiigoDevOps',
      alias: 'org'
    });
        
    this.option('project', {
      type: String,
      description: 'Project in azure devops.',
      default: 'Siigo',
      alias: 'p'
    });
        
    this.option('pipeline-name', {
      type: String,
      description: 'Pipeline name in azure devops.',
      default: `${currentPath}`,
      alias: 'pn'
    });
        
    this.option('folder', {
      type: String,
      description: 'Name of the folder that will contain the pipeline.',
      default: currentPath,
      alias: 'f'
    });
        
    this.option('environment', {
      type: String,
      description: 'Environment that has access to the cluster. https://dev.azure.com/SiigoDevOps/Siigo/_environments',
      default: 'aks',
      alias: 'e'
    });
        
    this.option('chart-version', {
      type: String,
      description: 'Siigo helm chart version. https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Chart/tags',
      default: lastChartVersion(''),
      alias: 'cv'
    });
        
    this.option('project-name', {
      type: String,
      description: 'Used in Helm chart name, tag docker image and sonar.',
    });
        
    this.option('namespace-k8s', {
      type: String,
      description: 'Namespace in kubernetes configured in the environment.',
      alias: 'ns'
    });
        
    this.option('port', {
      type: String,
      description: 'Port to expose the api gateway in the ingress controller. Confirm with architecture team if that port that you need its open.',
      default: null
    });
        
  }
    
  async initializing() {
    this.log(siigosay('Siigo Generator Api Gateway.'))
    const message = 'For more information execute yo siigo:gateway --help'
        
    if (!this.options['project-name'] || this.options['project-name'] === 'true')
      throw new Error('--project-name is required or it should not be empty.\n ' + message)
    if (!this.options['namespace-k8s'] || this.options['namespace-k8s'] === 'true')
      throw new Error('--namespace-k8s || --ns is required or it should not be empty.\n ' + message)
    if (this.options['port'] === 'null' || this.options['port'] === 'true' )
      throw new Error('--port is required or it should not be empty.\n ' + message)
    if ((this.options['chart-version'] === 'null' || this.options['chart-version'] === 'true'))
      throw new Error('--chart-version is required or it should not be empty.\n ' + message)
        
    const {organization, project, environment, folder, port} = this.options
    const namespace = this.options['namespace-k8s']
    this.appConfig = {
      organization,
      project,
      environment,
      namespace,
      folder,
      port,
      pipelineName: this.options['pipeline-name'],
      name: _.kebabCase(this.options['project-name']),
      chartVersion: this.options['chart-version'],
      owner: {
        user: await getParameter('user'),
        tribe: await getParameter('tribe')
      },
      repo: {
        url: _.trim(siigoShell.exec('git config --get remote.origin.url', {silent: true}).stdout)
      }
    };
        
    const json = JSON.stringify(this.appConfig, undefined, '  ')
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
    ]);
        
    if (!this.answers.ready)
      this.cancelCancellableTasks()
  }
    
  writing() {
    // @ts-expect-error FIXME: Missing method on @types/yeoman-generator
    this.queueTransformStream([
      rename((path: any) => {
        path.dirname = path.dirname.replace(
          'project_name',
          this.appConfig.name
        );
      }),
    ]);
            
    this.fs.copyTpl(this.templatePath(''), this.destinationPath('.'), {
      config: this.appConfig,
    });
            
    this.fs.copyTpl(
      this.templatePath('.docker'),
      this.destinationPath('.docker'),
      { config: this.appConfig }
    );
  }
            
  install() {
    if (this.options['skip-install-step']){
      return
    }
    if (siigoShell.exec('git checkout -b cicd').code !== ExitCode.OK){
      siigoShell.exec('git checkout cicd');
    }
            
    this.spawnCommandSync('git', ['add', '-A']);
    siigoShell.exec('git commit -m "cicd configuration"', {silent: true})
    this.spawnCommandSync('git', ['push', 'origin', 'cicd']);
        
    if (siigoShell.exec('az account show').code !== ExitCode.OK){
      siigoShell.exec('az login');
    }
    this.spawnCommandSync('az', ['extension', 'add', '--name', 'azure-devops']);
    spawn(
      `az devops configure --defaults organization='${this.appConfig.organization}' project='${this.appConfig.project}'`
    );

    this.spawnCommandSync('az', [
      'pipelines',
      'create',
      '--name',
      `${this.appConfig.pipelineName}`,
      '--yml-path',
      'azure-pipelines.yml',
      '--repository',
      this.appConfig.repo.url,
    ]);
  }
        
  end() {
    this.log(siigosay('Gateway Created!!'));
  }
}
            