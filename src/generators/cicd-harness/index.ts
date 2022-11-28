import Generator from "yeoman-generator";
import colorize from 'json-colorizer'
import os from 'os';
import fetch from 'node-fetch'

import fs from 'fs'

import {siigosay} from '@nodesiigo/siigosay'
import {saveStatistic} from '../../utils/statistics/statistic';
import path from 'path'

interface HarnessOptions extends Generator.GeneratorOptions {
    repo: string;
    microserviceName: string;
    sonarVersion:string
    namespace:string;
    branch:string;
    serviceType:string;
    // createPr:string;
    // commitMsg:string;
    // isNewBranch:boolean;
    // 'yaml-path': string;
    // 'skip-install-step': boolean;
    // type: TypeEnum;
    // pipelineName: string;
}

export default class HarnessGenerator extends Generator<HarnessOptions> {

    private answers: any
    private appConfig: any
    private defaultPipelineAttrs: any
    constructor(args: any, opt: any) {
        super(args, opt)
        saveStatistic(path.basename(__dirname))

         // Repo name
         this.option('repository', {
            type: String,
            description: 'Github  repo name',
            alias: 'repo'
        });

        // microserviceName
        this.option('microserviceName', {
            type: String,
            description: "microservice name",
            alias: 'ms-name'
        });
        this.option('sonarVersion', {
            type: String,
            description: "Sonar version",
            default:"5.5.3",
            alias: 'sonar-v'
        });
        this.option('namespace-k8s', {
            type: String,
            description: "namespace",
            alias: 'ns-k8s'
        });
        this.option('branch', {
            type: String,
            description: "source branch",
            alias: 'sb'
        });
        this.option('serviceType', {
            type: String,
            description: "service type, available options[\"gateway\",\"net\",\"go\"]",
            alias: 'st'
        });
     
        this.appConfig = {               
            repoName: this.options.repository || this.options.repo, 
            
            microserviceName: this.options.microserviceName || this.options['ms-name'] ,
            sonarVersion: this.options.sonarVersion || this.options['sonar-v'] ,
            namespace:this.options['namespace-k8s'] || this.options['ns-k8s'],
            branch: this.options.branch || this.options.sb,
            serviceType: this.options.serviceType || this.options.st ,
        }

        this.defaultPipelineAttrs ={
            "projectIdentifier":"Siigo_SAS",
            "orgIdentifier":"default",
            "connectorRef":"account.PoCEntireAccountGtihubConnector",
            "accountIdentifier":"kOhYGJcFTVS_qdgJCmgk9w",
            "storeType":"REMOTE",
            "isNewBranch": false

        }
    }

    async initializing(): Promise<void> {
        this.log(siigosay(`Siigo Harness Pipeline creation .`))
        this._checkMandatory()
    }

    // Pompting
    async prompting(): Promise<void> {
        var parameters = [
            {
                "message": "Typing the repository name",
                "name":"repoName",
                "type":"string",
            },
            {
                "message": "Typing the source branch",
                "name":"branch",
                "default":"dev",
                "type":"string",
            },
            {
                "message": "Typing the microservice name",
                "name":"microserviceName",
                "type":"string",
            },
            {
                "message": "Typing the service type ",
                "name":"serviceType",
                "type":"list",
                "choices": ["gateway","net","go"],
                
            },
            {
                "message": "Typing the sonar version",
                "name":"sonarVersion",
                "default":"5.5.3",
                "type":"string",
            },
            {
                "message": "Typing the k8s namespace ",
                "name":"namespace",
                "type":"string",
            }
        ] 
     
        var missingParameters = parameters.filter((p)=> !this.appConfig[p['name']])
  
        this.answers =  await this.prompt(missingParameters);
        for(var parameter of missingParameters ){
            this.appConfig[parameter['name']]= this.answers[parameter['name']]
        }
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

        this.answers = await this.prompt([
            {
                type: 'confirm',
                name: 'ready',
                message: 'Is the configuration correct?'
            }
        ])

        if (!this.answers.ready) {
            throw new Error('Configuration is not correct. Please, review the configuration and try again.')
        }

    }


    async install(){
        // open template yaml file
        let filecontent = fs.readFileSync(path.resolve(__dirname, 'templates/netcore.yaml')).toString();
        //   envs dict  
        let templateConfig = {
            projectIdentifier:this.defaultPipelineAttrs.projectIdentifier,
            orgIdentifier: this.defaultPipelineAttrs.orgIdentifier,
            ...this.appConfig,
        }
        templateConfig.repoIdentifier = templateConfig.repoName+'_' + templateConfig.branch 
        templateConfig.pipelineIdentifier = templateConfig.repoIdentifier+ '_'+templateConfig.microserviceName
        // replace envs in yaml file
        const rex = "#{" + Object.keys(templateConfig).join("}#|#{") + "}#"
        filecontent = filecontent.replace(new RegExp(rex,"g"), function(matched){
            matched = matched.substring(2,matched.length-2)// remove the #{}#
            return templateConfig[matched]
          });
   
        // url parameter
        let urlParameters = {
            repoName: templateConfig.repoName,
            branch:templateConfig.branch,
            filePath: ".harness/"+templateConfig.pipelineIdentifier1+".yaml",
            commitMsg: "creating pipeline author: "+os.userInfo().username,
            ...this.defaultPipelineAttrs

        }
        var url =  new URL("https://app.harness.io/gateway/pipeline/api/pipelines/v2")
        url.search = new URLSearchParams(urlParameters).toString()
        const headers = {
  
            "Sec-Fetch-Mode": "no-cors",
            "Origin":"https://google.com",
            "Sec-Fetch-Site": "cross-site",
            "x-api-key": "***",
            "Content-Type": "application/yaml",

        }
        // perform post to harness
        const pipelineResponse = await fetch(url, {
            "headers": headers,
            "body": filecontent,
            "method": "POST",
        });
        //  process response
        const jsonPipelineResponse  =JSON.parse(await pipelineResponse.text())
        if(pipelineResponse.status != 200){
            throw new Error(jsonPipelineResponse.message)

        }

    }

    end(): void {
        const message = "pipeline has been created" 
        this.log(siigosay(message))
    }

    _checkRequiredParam(param:string,flagName:string,shortFalgName:string = '' ){
        const message = 'For more information execute yo siigo:harness --help'
        const mandatoryMessage = 'is required or it should not be empty'
        if (!this.appConfig[param] )
            throw new Error(`--${flagName} || --${shortFalgName} ${mandatoryMessage}.\n ${message}`)
    }
    _checkMandatory(): boolean {

        const message = 'For more information execute yo siigo:harness --help'
        const mandatoryMessage = 'is required or it should not be empty'
       
      
        return true
    }

}




