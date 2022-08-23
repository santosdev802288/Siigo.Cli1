import os  from 'os'
import path  from 'path'
import colorize from'json-colorizer'
import {siigosay} from'@nodesiigo/siigosay'
import {MicroserviceGenerator} from '../../utils/generator/microservice'
import { getAllParametersSiigo, wizardsiigofile } from '../../utils/siigoFile'
import { saveStatistic } from '../../utils/statistics/statistic'
import shell from 'shelljs'
import { isTestEnv } from '../../utils/environment/node';


export default class GolangMSGenerator extends MicroserviceGenerator {

    appConfig: { description?: any; author?: any; name?: any; token?: any; auth?: any; redis?: any; email?: any } = {}

    constructor(args: any, opt: any) {
        super(args, opt)
        saveStatistic('bolt')
        // optionals
        this.option('project-name', {
            type: String,
            description: 'Name project.',
            default: this.defaultName,
            alias: 'pn'
        });

        this.option('description', {
            type: String,
            description: 'Description project',
            default: 'This is a Microservice from Siigo :)',
            alias: 'd'
        });

        this.option('author', {
            type: String,
            default: os.userInfo().username,
            alias: 'a'
        });

        this.option('personal-token', {
            description: 'Personal token. Generate your token https://dev.azure.com/SiigoDevOps/_usersSettings/tokens',
            type: String
        })
    }


    async initializing(){
        this.log(siigosay('Siigo Generator Golang.'))
    }

    async _doPrompting() {
        const siigoParams = await getAllParametersSiigo();

        if (siigoParams.token === 'pending' || this.options['personal-token'] != null) {
            this.options['personal-token'] = await wizardsiigofile(this.options['personal-token']);
        }else {
            this.options['personal-token'] = siigoParams.token
        }

        const {description} = this.options
        this.appConfig = {
            description,
            email: siigoParams.user,
            author: siigoParams.name,
            name: this.options['project-name'].toLowerCase(),
            token: this.options['personal-token'],
        };
        
 

        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        const json = JSON.stringify(this.appConfig, false, '\t')

        this.log(colorize(json, {
            pretty: true,
            colors: {
                STRING_KEY: 'green',
                STRING_LITERAL: 'magenta.bold',
                NUMBER_LITERAL: '#FF0000'
            }
        }))

        const response = await this.prompt([
            {
                type: 'confirm',
                name: 'auth',
                message: 'Do you want to add the module SECURITY?'
            }
        ]);

        const respRedis = await this.prompt([
            {
                type: 'confirm',
                name: 'redis',
                message: 'Do you want to add the module REDIS?'
            }
        ]);
        
        this.answers = await this.prompt([
            {
                type: 'confirm',
                name: 'ready',
                message: 'Is the configuration correct?'
            }
        ]);

        this.appConfig.auth =  response.auth;      
        this.appConfig.redis =  respRedis.redis; 

        if (!this.answers.ready)
            this.cancelCancellableTasks()
    }

    _doWriting() {
        
        this.fs.copyTpl(this.templatePath(''),this.destinationRoot(),{config: this.appConfig},)
        this.fs.copyTpl(this.templatePath('.third_party'),this.destinationPath('third_party'),{config: this.appConfig})
        
        // Update .gitconfig
        const templateGitConfig = this.templatePath('.user/.gitconfig');
        const userGitConfig = this.destinationPath(path.join(os.homedir(), '.gitconfig'))

        if (this.fs.exists(userGitConfig)) {
            const gitConfig = this.fs.read(userGitConfig)
            if (!gitConfig.includes('insteadOf = https://dev.azure.com/SiigoDevOps')){
                const templateContent = this.fs.read(templateGitConfig)
                // @ts-expect-error FIXME: Missing method on @types
                this.fs.appendTpl(userGitConfig, templateContent, {config: this.appConfig})
            }
        } else {
            this.fs.copyTpl(templateGitConfig, userGitConfig, {config: this.appConfig})
        }
        
        // Copy all dotfiles
        this.fs.copyTpl(this.templatePath('.dots/.*'), this.destinationRoot(), {config: this.appConfig});
        this.fs.copyTpl(this.templatePath('.dots/.**/**'), this.destinationRoot(), {config: this.appConfig})

        if(this.appConfig.auth && this.appConfig.redis){
            this._copyFilesModules('mod_auth_redis',['boot','config','fxmodule']);
        }else{
            if(this.appConfig.auth){
                this._copyFilesModules('mod_auth',['boot']);
            }
            if(this.appConfig.redis){
                this._copyFilesModules('mod_redis',['config','fxmodule']);
            }
        }
    }

    _copyFilesModules(path:string , files:string[]){
        files.forEach(file => {
            this.fs.copyTpl(this.templatePath(`.${path}/${file}`),this.destinationPath(`src/${file}/`),{config: this.appConfig})
        })
    }

    install(){
        shell.env['GOPRIVATE'] = 'dev.azure.com';
        if(!isTestEnv()){
            if(this.appConfig.auth && this.appConfig.redis){
                shell.exec('go get dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Golang.Security.git/Interceptor')
                shell.exec('go get github.com/grpc-ecosystem/go-grpc-middleware/auth')
                shell.exec('go get dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Golang.DistributedCache.git/Redis')
            }else{
                if(this.appConfig.auth){
                    shell.exec('go get dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Golang.Security.git/Interceptor')
                    shell.exec('go get github.com/grpc-ecosystem/go-grpc-middleware/auth')
                }
                if(this.appConfig.redis){
                    shell.exec('go get dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Golang.DistributedCache.git/Redis')
                }
                shell.exec('go mod tidy')
            }
        }
    }

    end(): void {

        this.log(siigosay("Execute 'make all' and Enjoy!!"))
    }
}

MicroserviceGenerator.yeomanInheritance(GolangMSGenerator)
