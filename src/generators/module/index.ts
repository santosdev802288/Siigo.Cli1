import Generator = require('yeoman-generator')
import {capitalize} from '../../utils/capitalize'
import {verifyNewVersion} from '../../utils/notification';
import rename from 'gulp-rename';
import {siigosay} from '@nodesiigo/siigosay'


interface Options {
    name: string
}


export default class ModuleGenerator extends Generator<Options> {

    constructor(args: string | string[], opt: Options) {
        verifyNewVersion()
        super(args, opt)
        this.argument('name', { required: true })
    }

    initializing(): void {
        this.log(siigosay('Siigo generator Nest module.'))
    }

    writing(): void {
        const name = this.options['name']

        // @ts-expect-error FIXME: Missing method on @types/yeoman-generator
        this.queueTransformStream([
            rename((path) => {
                path.basename = path.basename.replace(/(user)/g, name.toLowerCase())
            }),
        ]);

        this.fs.copyTpl(
            this.templatePath(''),
            this.destinationPath(`src/${name.toLowerCase()}/`),
            {config: {name, nameUpper: capitalize(name)}}
        )
    }

    install(): void {

        this.log(siigosay(`
            Import in your AppModule
        `))
    }
}
