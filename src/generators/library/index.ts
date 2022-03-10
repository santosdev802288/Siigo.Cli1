import { siigosay } from '@nodesiigo/siigosay';
import _ from 'lodash'

import { getAllParametersSiigo, wizardsiigofile } from '../../utils/siigoFile';
import {LibraryGenerator} from '../../utils/generator/librarySiigo'
import { saveStatistic } from '../../utils/statistics/statistic';

export enum FeedIdsPrefix {
  Dotnet = '2b375626-f976-487e-9aa8-097804b773cc/f5afef96-b3bc-414a-8cb5-9a30e2c98a8d',
  Node = '2b375626-f976-487e-9aa8-097804b773cc/eea97eb8-b2a7-47d3-9be4-59f9684ddb31',
  Angular = '2b375626-f976-487e-9aa8-097804b773cc/9e179dbd-5040-499b-a749-9d00abeaf811',
}

function getKeyName(value: string) {
  return Object.entries(FeedIdsPrefix).find(([key, val]) => key === value)?.[1];
}

export default class DotnetMSGenerator extends LibraryGenerator {
  appConfig: {
        name?: any,
        nameLowercase?: any,
        nameCapitalize?: any,
        projectPrefix?: any,
        token?: any,
        type?: any,
        publishVstsFeed?: any,
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
    this.log(siigosay('Siigo Generator Library.'));
  }

  async _doPrompting() {
    const objParameters = await getAllParametersSiigo();

    // TODO Save statistics
    //saveStatistic('dotnet-'+response.type)
      
    let tokenf = objParameters.token;
    const updatetoken = this.options['token'];
    if (tokenf == 'pending' || updatetoken != null)
      tokenf = await wizardsiigofile(updatetoken);
    this.appConfig = {};
    this.appConfig.name = this.options['name'];
    this.appConfig.nameLowercase = (this.options['name']).toLowerCase();
    this.appConfig.nameCapitalize = _.upperFirst(this.appConfig.name);
    this.appConfig.type = this.options['language']
    this.appConfig.publishVstsFeed = getKeyName(this.options['language'])
    this.appConfig.userSiigo = (objParameters as any).user;
    this.appConfig.nameDev = (objParameters as any).name;
    this.appConfig.token = tokenf;
    this.appConfig.projectPrefix = this.options['project-prefix'];
      
  }

  _doWriting(): void {
      
    /// / @ts-expect-error FIXME: Missing method on @types/yeoman-generator
    // this.queueTransformStream([
    //   rename((path: any) => {
    //     path.basename = path.basename.replace(/(Library)/g, this.appConfig.name )
    //   }),
    // ]);

    this.fs.copyTpl(
      this.templatePath(`${this.appConfig.type}/`),
      this.destinationPath(''),
      { config: this.appConfig },
      {},
      {
        processDestinationPath: (filePath) => filePath.replace(/(Library)/g, this.appConfig.name), 
        globOptions: {dot: true}
      },
    )

  }
    
  end() {
    this.log(siigosay('Library Created!!'));
  }
}

LibraryGenerator.yeomanInheritance(DotnetMSGenerator)
