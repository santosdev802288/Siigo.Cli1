const Generator = require('yeoman-generator/lib');
const yosay = require('yosay')
const capitalize = require('../../utils/capitalize')
const verifyNewVersion = require("../../utils/notification");
const rename = require('gulp-rename');

module.exports = class extends Generator {

    constructor(args, opt) {
        verifyNewVersion()
        super(args, opt)

        this.log(yosay(`Siigo generator Nest module.`))
        this.argument("name", { required: true })
    }

    writing() {
        let name = this.options['name']

        this.registerTransformStream([
            rename((path) => {
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

        this.log(yosay(`
            Import in your AppModule
        `))
    }

    /*
        if (this.options['skip-install']) {
            this.log(chalk.green(`
        To install dependencies, run
        ${chalk.white('$')} cd ${this.appConfig.identifier}/
        ${chalk.white('$')} npm install
      `))
        } else {
            if (this.options['yarn']) {
                this.installDependencies({
                    yarn: true,
                    bower: false,
                    npm: false,
                })
            } else {
                this.installDependencies({
                    npm: true,
                    yarn: false,
                    bower: false,
                })

            }
        }
    }*/
};
