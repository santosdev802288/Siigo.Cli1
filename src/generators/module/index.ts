import Generator = require('yeoman-generator')
import {verifyNewVersion} from '../../utils/notification'
import rename from 'gulp-rename'
import {siigosay} from '@nodesiigo/siigosay'
import _ from 'lodash'
import { saveStatistic } from '../../utils/statistics/statistic'


interface Options {
    name: string
}


export default class ModuleGenerator extends Generator<Options> {

  constructor(args: string | string[], opt: Options) {
    verifyNewVersion()
    super(args, opt)
    saveStatistic('node-module')
    this.argument('name', { required: true })
  }

  initializing(): void {
    this.log(siigosay('Siigo generator Nest module.'))
  }

  writing(): void {
    const name = _.camelCase(this.options['name'])

    // @ts-expect-error FIXME: Missing method on @types/yeoman-generator
    this.queueTransformStream([
      rename((path) => {
        path.basename = path.basename.replace(/(user)/g, name.toLowerCase())
      }),
    ])

    this.fs.copyTpl(
      this.templatePath(''),
      this.destinationPath(`src/${name.toLowerCase()}/`),
      {config: {name, nameUpper: _.upperFirst(name)}}
    )
  }

  install(): void {
    this.log(siigosay('Import in your AppModule'))
  }
}
