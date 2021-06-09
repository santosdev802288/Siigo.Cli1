const Generator = require('yeoman-generator/lib');
const capitalize = require('../../utils/capitalize')
const verifyNewVersion = require("../../utils/notification");
const rename = require('gulp-rename');
const {siigosay} = require('@nodesiigo/siigosay')

module.exports = class extends Generator {

    constructor(args, opt) {
        verifyNewVersion()
        super(args, opt)
        this.log(siigosay(`Siigo generator Nest module.`))
        this.argument("name", { required: true })
    }

    writing() {
        let name = this.options['name']

        this.queueTransformStream([
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

        this.log(siigosay(`
            Import in your AppModule
        `))
    }
};
