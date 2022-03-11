import rename = require('gulp-rename');
import path from 'path';
import { siigosay } from '@nodesiigo/siigosay';
import _ from 'lodash'

import { getAllParametersSiigo, wizardsiigofile } from '../../utils/siigoFile';
import { getChecksums } from '../../utils/checksum';
import {MicroserviceGenerator} from '../../utils/generator/microservice'
import { saveStatistic } from '../../utils/statistics/statistic';


export default class DotnetMSGenerator extends MicroserviceGenerator {
  appConfig: {
        name?: any,
        nameCapitalize?: any,
        projectPrefix?: any,
        token?: any,
        type?: any,
        userSiigo?: any,
        nameDev?: any,
    } = {};
    
  constructor(args: any, opt: any) {
    super(args, opt);
                
    this.option('name', {
      description: 'Project name',
      default: this.defaultName,
      type: String
    });
    this.option('project-prefix', {
      description: 'Use this option to replace the prefix Siigo in the file names',
      default: 'Siigo',
      type: String
    });
  }
  async initializing() {
    this.log(siigosay('Siigo Generator .Net Core.'));
  }

  async _doPrompting() {
    const objParameters = await getAllParametersSiigo();
    const response = await this.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'what do you want to generate?',
        choices: ['basic', 'command', 'query', 'command+query', 'grpc-server', 'grpc-client']
      }
    ])
    saveStatistic('dotnet', {type: response.type})
    let tokenf = objParameters.token;
    const updatetoken = this.options['token'];
    if (tokenf == 'pending' || updatetoken != null)
      tokenf = await wizardsiigofile(updatetoken);
    this.appConfig = {};
    this.appConfig.name = this.options['name'];
    this.appConfig.nameCapitalize = _.upperFirst(this.appConfig.name);
    this.appConfig.type = response.type;
    this.appConfig.userSiigo = (objParameters as any).user;
    this.appConfig.nameDev = (objParameters as any).name;
    this.appConfig.token = tokenf;
    this.appConfig.projectPrefix = this.options['project-prefix'];
  }

  _doWriting(): void {
    const nametemplate = (this.appConfig.type == 'command+query') ? 'commandquery' : this.appConfig.type;
    // @ts-expect-error FIXME: Missing method on @types/yeoman-generator
    this.queueTransformStream([
      rename((parsetPath) => {
        const prefixChart = 'ms-';
        parsetPath.dirname = parsetPath.dirname.includes(prefixChart) ?
          parsetPath.dirname.replace(/(Microservice)/g, this.appConfig.name) :
          parsetPath.dirname.replace(/(Microservice)/g, _.upperFirst(this.appConfig.name));
        parsetPath.basename = parsetPath.basename.replace(/(Microservice)/g, _.upperFirst(this.appConfig.name));
        parsetPath.dirname = parsetPath.dirname.replace(/(Siigo)/g, this.appConfig.projectPrefix);
        parsetPath.basename = parsetPath.basename.replace(/(Siigo)/g, this.appConfig.projectPrefix);
      })
    ]);
    this.fs.copyTpl(this.templatePath('base/*'), this.destinationPath('.'), { config: this.appConfig }, {}, {globOptions: {dot: true}})

    this.fs.copyTpl(this.templatePath(nametemplate + '/'), this.destinationPath('.'), { config: this.appConfig });
    this.fs.copyTpl(this.templatePath(nametemplate + '/.*'), this.destinationPath('.'), { config: this.appConfig });
    const checksums = getChecksums(this.destinationPath());
    this.fs.write(path.join(this.destinationPath(), 'checksums.sha256'), checksums);
  }
    
  end() {
    this.log(siigosay('Project Created!!'));
  }
}

MicroserviceGenerator.yeomanInheritance(DotnetMSGenerator)
