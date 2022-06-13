import rename = require('gulp-rename');
import path from 'path';
import { siigosay } from '@nodesiigo/siigosay';
import _ from 'lodash'

import { getAllParametersSiigo, wizardsiigofile } from '../../utils/siigoFile';
import { getChecksums } from '../../utils/checksum';
import {MicroserviceGenerator} from '../../utils/generator/microservice'
import { saveStatistic } from '../../utils/statistics/statistic';
import { ServerType } from './enums';

const ServerTypes = Object.values(ServerType)

export default class DotnetMSGenerator extends MicroserviceGenerator {
  
  appConfig !: {
    name: string;
    nameCapitalize: string;
    projectPrefix: string;
    token: string;
    type: ServerType;
    userSiigo: string;
    nameDev: string;
  };
    
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
        message: '¿what do you want to generate?',
        choices: ServerTypes,
        default: ServerTypes.indexOf(ServerType.MICROSERVICE)
      }
    ])
    saveStatistic('dotnet', {type: response.type})
    let tokenf = objParameters.token;
    const updatetoken = this.options['token'];
    if (tokenf == 'pending' || updatetoken != null)
      tokenf = await wizardsiigofile(updatetoken);
    this.appConfig = {
      name: this.options['name'],
      nameCapitalize: _.upperFirst(this.options['name']),
      type: response.type,
      userSiigo: (objParameters as any).user,
      nameDev: (objParameters as any).name,
      token: _.defaultTo(tokenf, ''),
      projectPrefix: this.options['project-prefix'],
    }
  }

  _doWriting(): void {
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
    this.fs.copyTpl(this.templatePath('base/'), this.destinationPath('.'), { config: this.appConfig }, {}, {globOptions: {dot: true}})

      this.fs.copyTpl(this.templatePath(this.appConfig.type + '/'), this.destinationPath('.'), { config: this.appConfig });
      this.fs.copyTpl(this.templatePath(this.appConfig.type + '/.*'), this.destinationPath('.'), { config: this.appConfig });
    const checksums = getChecksums(this.destinationPath());
    this.fs.write(path.join(this.destinationPath(), 'checksums.sha256'), checksums);
  }
    
  end() {
    this.log(siigosay('Project Created!!'));
  }
}

MicroserviceGenerator.yeomanInheritance(DotnetMSGenerator)
