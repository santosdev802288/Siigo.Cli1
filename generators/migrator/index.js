const Generator = require('yeoman-generator/lib');
const yosay = require('yosay');
const capitalize = require('../../utils/capitalize');
const rename = require('gulp-rename');
const verifyNewVersion = require('../../utils/notification');
const path = require('path');
const spawn = require('child_process').exec;
const toLowerCase = require('../../utils/toLowerCase');

module.exports = class extends Generator {
  constructor(args, opt) {
    verifyNewVersion();
    super(args, opt);

    this.log(yosay(`Siigo Generator Migrator`));

    const prefixRepo = 'Siigo.Spark.';
    const currentPath = path.basename(process.cwd());

    if (!currentPath.startsWith(prefixRepo))
      throw new Error(`The name project should starts with ${prefixRepo}`);

    const [name, ..._] = currentPath.split('.').reverse();

    this.option('name', {
      required: true,
      description: 'Project name',
      default: name,
      type: String,
    });
  }

  initializing() {
    const message = 'For more information execute yo siigo:migrator --help';
    if (this.options['name'] === 'true' || !this.options['name'])
      throw new Error(
        '--name is required or it should not be empty.\n ' + message
      );
  }

  prompting() {
    this.appConfig = {};
    this.appConfig.name = this.options['name'];
    this.appConfig.nameCapitalize = capitalize(this.appConfig.name);
    this.appConfig.nameLowerCase = toLowerCase(this.appConfig.name);
  }
  writing() {
    this.registerTransformStream([
      rename((path) => {
        path.basename = path.basename.replace(
          'project_name',
          this.appConfig.name
        );
      }),
    ]);

    this.fs.copyTpl(this.templatePath(''), this.destinationPath('.'), {
      config: this.appConfig,
    });

    this.fs.copyTpl(this.templatePath('.*'), this.destinationPath('.'), {
      config: this.appConfig,
    });

    this.fs.copyTpl(
      this.templatePath('.docker'),
      this.destinationPath('.docker'),
      { config: this.appConfig }
    );
  }

  end() {
    this.log(yosay(`Project Created!!`));
  }
};
