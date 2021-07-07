import { ParsedPath } from "gulp-rename";
import Generator = require("yeoman-generator")
const capitalize = require('../../utils/capitalize')
const verifyNewVersion = require("../../utils/notification");
const rename = require('gulp-rename');
const {siigosay} = require('@nodesiigo/siigosay')


interface Arguments {
    arg1: string
    arg2: string
    argRest: string[]
    option1: boolean
    option2: string
  }

export class ModuleGenerator extends Generator {
    [x: string]: any;

    constructor(args: string | string[], opt: Generator.GeneratorOptions) {
        verifyNewVersion()
        super(args, opt)
        this.log(siigosay(`Siigo generator Nest module.`))
        this.argument("name", { required: true })
    }

    writing() {
        let name = this.options['name']

        this.queueTransformStream([
            rename((path: ParsedPath) => {
                path.basename = path.basename.replace(/(user)/g, name.toLowerCase())
            }),
        ]);

        this.fs.copyTpl(
            this.templatePath(""),
            this.destinationPath(`src/${name.toLowerCase()}/`),
            {config: {name, nameUpper: capitalize(name)}}
        )
    }

    install() {

        this.log(siigosay(`
            Import in your AppModule
        `))
    }
};
