import colorize from 'json-colorizer'
import {siigosay} from '@nodesiigo/siigosay'
import {getAllParametersSiigo, wizardsiigofile, getParameter} from '../../utils/siigoFile'
import {TestingGenerator} from '../../utils/generator/testing'
import {GeneratorOptions} from 'yeoman-generator'
import {exec as spawn} from 'child_process';
import path from 'path';
import shell from 'shelljs'

import { saveStatistic } from '../../utils/statistics/statistic'
import { getProjects } from '../../utils/gitmanager'
import { isInsideGitRepo, remoteExists } from '../../utils/git'


// eslint-disable-next-line @typescript-eslint/no-var-requires
const yeoman = require('yeoman-environment')
const env = yeoman.createEnv()

interface Ak6Options extends GeneratorOptions {
    name: string;
    'skip-install-step': boolean;
}

type AppConfig = {
    description: string;
    author: string;
    name: string;
    token: string;
    project: string;
    organization: string
}

export default class Ak6TestingGenerator extends TestingGenerator<Ak6Options> {

  private appConfig: Partial<AppConfig> = {}

  constructor(args: any, options: Ak6Options) {
    super(args, options)
    saveStatistic('test-ak6')
    // optionals
    this.option('name', {
      type: String,
      description: 'Name project.',
      default: this.defaultName,
      alias: 'pn'
    });

    this.option('organization', {
      type: String,
      description: 'Url of the organization in azure devops.',
      default: 'https://dev.azure.com/SiigoDevOps',
      alias: 'org'
    })

    this.option('project', {
      type: String,
      description: 'Project in azure devops.',
      default: 'Siigo',
      alias: 'p'
    })

    this.option('skip-install-step', {
      type: Boolean,
      description: 'Saltar el paso de instalación.',
      default: false,
    })

  }

  async _doPrompting(): Promise<void> {
    const message = 'For help execute "yo siigo:test-ak6 --help".';

    let token = await getParameter('token')
    token = (token === 'pending') ? await wizardsiigofile() : token

    const projects = await getProjects(token)
    const nameProjects = Object.keys(projects)
    const response = await this.prompt([
      {
        type: 'confirm',
        name: 'createRepo',
        message: '¿Crear repositorio remoto en Azure DevOps?',
        default: true
      },
      {
        type: 'list',
        name: 'project',
        message: 'In which Project?',
        choices: nameProjects,
        default: 'Siigo',
      },
    ]);

    if (response.createRepo){
      env.register(require.resolve('../git'), 'siigo:git')
      await env.run('siigo:git',{'project':`${response.project}`})
    }

    this.log(siigosay('Siigo AK6 Generator.'))

    const siigoParams = await getAllParametersSiigo();

    if (siigoParams.token === 'pending' || this.options['personal-token'] != null) {
      this.options['personal-token'] = await wizardsiigofile(this.options['personal-token']);
    }else {
      this.options['personal-token'] = siigoParams.token
    }

    ['name'].forEach(option => {
      if (this.options[option] === 'true' || !this.options[option])
        throw new Error(`${option} is required.\n${message}`)
    });

    const {description, author, organization } = this.options
    this.appConfig = {
      description,
      organization,
      author,
      project: response.project,
      name: this.options.name.toLowerCase(),
      token: this.options['personal-token'],
    };
        

    const json = JSON.stringify(this.appConfig, null, '\t')

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

  async _doWriting(): Promise<void> {
    this.fs.copyTpl(
      this.templatePath('.docker/ak6'),
      this.destinationPath(`.docker/${this.appConfig.name}`),
      { config: this.appConfig },
    )
        
    this.fs.copyTpl(
      this.templatePath(''),
      this.destinationRoot(),
      {config: this.appConfig},
    );
        
    // Copy dotfiles
    this.fs.copy(
      this.templatePath('.dotfiles/.*'),
      this.destinationRoot(),
      {},
      {config: this.appConfig}
    );
  }

  install(): void{
    if (this.options['skip-install-step']) {
      return
    }
    if (!isInsideGitRepo()) {
      this.log.writeln('Create local git repo')
      super.spawnCommandSync('git', ['init'])
    }

    this.log.writeln('Commit changes')
    shell.exec('git add -A', {silent: true})
    shell.exec('git commit -m "siigo cli: init ak6 test project"', {silent: true})

    if (remoteExists()) {
      this.log.writeln('Push changes')
      super.spawnCommandSync('git', ['push', '--set-upstream', 'origin', 'master'])
    } else {
      throw new Error('Missing remote branch');
    }

    const currentPath = path.basename(process.cwd())

    super.spawnCommandSync('az', ['login'])
    super.spawnCommandSync('az', ['extension','add','--name', 'azure-devops'])

    shell.echo(this.appConfig.token ?? '').exec('az devops login')
    
    spawn(`az devops configure --defaults organization='${this.appConfig.organization}' project='${this.appConfig.name}'` )
    this.spawnCommandSync('az',
      ['pipelines','create','--name', currentPath,
        '--yml-path', 'azure-pipelines.yml',
        '--folder-path',currentPath,
        '--repository-type', 'tfsgit',
        '--project', String(this.appConfig.project),
        '--repository' , currentPath,
      ]
    )
    super.spawnCommandSync('yarn',['install'])
  }

  end(): void {
    this.log(siigosay('Enjoy!!'))
  }
}

TestingGenerator.yeomanInheritance(Ak6TestingGenerator)

