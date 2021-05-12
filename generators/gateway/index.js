const path = require('path');
const Generator = require('yeoman-generator/lib');
const yosay = require('yosay');
const rename = require('gulp-rename');
const spawn = require('child_process').exec;
const colorize = require('json-colorizer');
const shell = require("shelljs")

module.exports = class extends Generator {
  constructor(args, opt) {
    super(args, opt);

    this.log(yosay(`Siigo Generator Api Gateway.`))
    const currentPath = path.basename(process.cwd())

    // optionals
    this.option("organization", {
      type: String,
      required: false,
      description: "Url of the organization in azure devops.",
      default: 'https://dev.azure.com/SiigoDevOps',
      alias: 'org'
    });

    this.option("project", {
      type: String,
      required: false,
      description: "Project in azure devops.",
      default: 'Siigo',
      alias: "p"
    });

    this.option("pipeline-name", {
      type: String,
      required: false,
      description: "Pipeline name in azure devops.",
      default: `${currentPath} CICD`,
      alias: 'pn'
    });

    this.option("folder", {
      type: String,
      required: false,
      description: "Name of the folder that will contain the pipeline.",
      default: currentPath,
      alias: 'f'
    });

    this.option("environment", {
      type: String,
      required: false,
      description: "Environment that has access to the cluster. https://dev.azure.com/SiigoDevOps/Siigo/_environments",
      default: `aks`,
      alias: 'e'
    });

    this.option("chart-version", {
      type: String,
      required: false,
      description: "Siigo helm chart version. https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Chart/tags",
      default: 'null',
      alias: 'cv'
    });

    this.option("project-name", {
      type: String,
      required: true,
      description: "Used in Helm chart name, tag docker image and sonar.",
    });

    this.option("namespace-k8s", {
      type: String,
      required: true,
      description: "Namespace in kubernetes configured in the environment.",
      alias: 'ns'
    });

    this.option("port", {
      type: String,
      required: true,
      description: "Port to expose the api gateway in the ingress controller. Confirm with architecture team if that port that you need its open.",
      default: null
    });

  }

  async initializing() {
    const message = "For more information execute yo siigo:cicd --help"

    if (!this.options['project-name'] || this.options['project-name'] === 'true')
      throw new Error("--project-name is required or it should not be empty.\n " + message)
    if (!this.options['namespace-k8s'] || this.options['namespace-k8s'] === 'true')
      throw new Error("--namespace-k8s || --ns is required or it should not be empty.\n " + message)
    if (this.options['port'] === 'null' || this.options['port'] === 'true' )
      throw new Error("--port is required or it should not be empty.\n " + message)
    if ((this.options['chart-version'] === 'null' || this.options['chart-version'] === 'true'))
      throw new Error("--chart-version is required or it should not be empty.\n " + message)

    const {organization, project, environment, folder, port} = this.options
    const namespace = this.options['namespace-k8s']
    this.appConfig = {
      organization,
      project,
      environment,
      namespace,
      folder,
      port,
      pipelineName: this.options['pipeline-name'],
      name: this.options['project-name'],
      chartVersion: this.options['chart-version'],
    };

    const json = JSON.stringify(this.appConfig, false, '\t')
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
        type: "confirm",
        name: "ready",
        message: "Is the configuration correct?"
      }
    ]);

    if (!this.answers.ready)
      this.cancelCancellableTasks()
  }

  writing() {

    this.registerTransformStream([
      rename((path) => {
        path.dirname = path.dirname.replace(
          'project_name',
          this.appConfig.name
        );
      }),
    ]);

    this.fs.copyTpl(this.templatePath(''), this.destinationPath('.'), {
      config: this.appConfig,
    });

    this.fs.copyTpl(
      this.templatePath('.docker'),
      this.destinationPath('.docker'),
      { config: this.appConfig }
    );
  }

  install() {
    this.spawnCommandSync('git', ['checkout', '-b', 'cicd']);
    this.spawnCommandSync('git', ['add', '-A']);
    this.spawnCommandSync('git', ['commit', '-m', 'cicd configuration']);
    this.spawnCommandSync('git', ['push', 'origin', 'cicd']);

    this.spawnCommandSync('az', ['login']);
    this.spawnCommandSync('az', ['extension', 'add', '--name', 'azure-devops']);
    spawn(
      `az devops configure --defaults organization='${this.appConfig.organization}' project='${this.appConfig.project}'`
    );
    this.spawnCommandSync('az', [
      'pipelines',
      'create',
      '--name',
      this.appConfig.pipelineName,
      '--yml-path',
      'azure-pipelines.yml',
      '--folder-path',
      this.appConfig.folder,
    ]);
  }

  end() {
    this.log(yosay(`Gateway Created!!`));
  }
};
