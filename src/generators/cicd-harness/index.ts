import Generator from "yeoman-generator";
import colorize from 'json-colorizer'
import os from 'os';
import fetch from 'node-fetch'

import fs from 'fs'
import { getParameter} from '../../utils/siigoFile'

import {siigosay} from '@nodesiigo/siigosay'
import {saveStatistic} from '../../utils/statistics/statistic';
import path from 'path'
import { MicroserviceGenerator } from "../../utils/generator/microservice";
import { split } from "lodash";

interface HarnessOptions extends Generator.GeneratorOptions {
    repo: string;
    microserviceName: string;
    sonarVersion:string
    namespace:string;
    // branch:string;
    serviceType:string;
    country:string;
    htoken:string;
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
    private vuser :string
    private htoken :string
    constructor(args: any, opt: any) {
        super(args, opt)
        saveStatistic(path.basename(__dirname))

         // Repo name
        //  this.option('repository', {
        //     type: String,
        //     description: 'Github  repo name',
        //     alias: 'repo'
        // });

        // microserviceName
        this.option('microserviceName', {
            type: String,
            description: "microservice name",
            alias: 'ms-name'
        });
        // microserviceName
        // this.option('country', {
        //     type: String,
        //     description: "country of microservice",
        //     alias: 'c'
        // });
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
        // this.option('branch', {
        //     type: String,
        //     description: "source branch",
        //     alias: 'sb'
        // });
        // this.option('serviceType', {
        //     type: String,
        //     description: "service type, available options[\"gateway\",\"net\",\"go\"]",
        //     alias: 'st'
        // });
        // this.option('htoken', {
        //     type: String,
        //     description: "the secret harness token ",
        //     alias: 't'
        // });
     
        this.appConfig = {               
            repoName: this.options.repository || this.options.repo, 
            
            microserviceName: this.options.microserviceName || this.options['ms-name'] ,
            sonarVersion: this.options.sonarVersion || this.options['sonar-v'] ,
            namespace:this.options['namespace-k8s'] || this.options['ns-k8s'],
            // branch: this.options.branch || this.options.sb,
            // htoken: this.options.htoken || this.options.t,
            // country: this.options.country || this.options.c,
            // serviceType: this.options.serviceType || this.options.st ,
        }

        this.defaultPipelineAttrs ={
            "projectIdentifier":"Siigo_SAS",// nombre de proyecto a nivel de harness
            "orgIdentifier":"default", // organizacion en harness
            "connectorRef":"account.PoCEntireAccountGtihubConnector",
            "accountIdentifier":"kOhYGJcFTVS_qdgJCmgk9w",
            "storeType":"REMOTE",
            "isNewBranch": true,
            branch:'harness-integration',
            baseBranch:'dev',
            targetBranch: 'dev',
            createPr:true

        }
        this.htoken= ""
        this.vuser= ""
    }

    async initializing(): Promise<void> {
        this.log(siigosay(`Siigo Harness Pipeline creation .`))
        this._checkMandatory()
    }

    // Pompting
    async prompting(): Promise<void> {
        this.vuser = await getParameter("user")
        this.htoken =  await getParameter('harness-token')
        if(this.vuser in ["pending","pendiente"]){
            throw new Error('User is is not in the session. Please run yo siigo:config and set user')
            
        }
        // console.log("'"+this.vuser+"'")
        if(!this.htoken.startsWith("pat.")){
            throw new Error('Harness token is not in the session. Please   run yo siigo:config and set the harness-token')
            
        }
        this.appConfig.repoName = this.getRepositoryName()
        this.appConfig.microserviceName = this.getMicroserviceName(this.appConfig.repoName)
        
        const parameters = [
            // {
            //     "message": "Typing the repository name",
            //     "name":"repoName",
            //     "type":"string",
            // },
            // {
            //     "message": "Typing the source branch",
            //     "name":"branch",
            //     "default":"dev",
            //     "type":"string",
            // },
            // {
            //     "message": "Typing the microservice name",
            //     "name":"microserviceName",
            //     "type":"string",
            // },
            {
                "message": "Typing the country",
                "name":"country",
                "type":"list",
                "choices": ["Col","Mex","Ecu",],

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
            },
            // {
            //     "message": "Typing the harness token",
            //     "name":"htoken",
            //     "type":"string",
            // },
        ] 
     
        const missingParameters = parameters.filter((p)=> !this.appConfig[p['name']])
  
        this.answers =  await this.prompt(missingParameters);
        
        for(const parameter of missingParameters ){
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
        const templateConfig = {
            projectIdentifier:this.defaultPipelineAttrs.projectIdentifier,
            orgIdentifier: this.defaultPipelineAttrs.orgIdentifier,
            pipelineIdentifier: (this.appConfig.repoName+ this.appConfig.country).replace(/[^\w ]/g, ''), 
            repoIdentifier : this.appConfig.repoName+'_' + this.appConfig.branch +'_'+this.appConfig.microserviceName,
            branch: this.defaultPipelineAttrs.baseBranch,
            ...this.appConfig,
        }
        // replace envs in yaml file
        const rex = "#{" + Object.keys(templateConfig).join("}#|#{") + "}#"
        filecontent = filecontent.replace(new RegExp(rex,"g"), function(matched){
            matched = matched.substring(2,matched.length-2)// remove the #{}#
            return templateConfig[matched]
          });
        //   console.log(filecontent)
        // url parameter
        
        
        const urlParameters = {
            repoName: templateConfig.repoName,
  
            // filePath: ".harness/"+templateConfig.pipelineIdentifier+".yaml",
            filePath: ".harness/harness-pipeline_"+this.appConfig.country+".yaml",
            commitMsg: "creating pipeline.\n Author: "+ this.vuser,
            
            ...this.defaultPipelineAttrs

        }
        const url =  new URL("https://app.harness.io/gateway/pipeline/api/pipelines/v2")
        url.search = new URLSearchParams(urlParameters).toString()
        const headers = {
  
            "Sec-Fetch-Mode": "no-cors",
            "Origin":"https://google.com",
            "Sec-Fetch-Site": "cross-site",
            "x-api-key":this.htoken,
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
        const message = "Pipeline has been created." 
        this.log(siigosay(message))
    }

    
    _checkMandatory(): boolean {

        // const message = 'For more information execute yo siigo:harness --help'
        // const mandatoryMessage = 'is required or it should not be empty'
       
      
        return true
    }
    getRepositoryName(){
        const repository = path.basename(process.cwd())

        const repoParts =  repository.split('.') 
     
        // // console.log("reponame"+ repository.split('.'))
        if(( repoParts.length!=3 || repoParts[0]!= 'Siigo')){
            throw new Error('Current folder doesn\'t a Siigo Repository.')
            
        }
        return repository;


    }
    getMicroserviceName(repoName:string){
        if(repoName!=undefined){
            const repoParts = repoName.split(".")
   
            const repoType= repoParts[1]
            
            const name = repoParts[2].toLowerCase()     
            // console.log( "here"+repoName.split('.'))
    
            if( repoType == 'Gateway' ){
                return 'api-gateway-' + name
            }
            if( repoType == 'Microservice' ){
                return 'ms-' + name
            }
            throw new Error('The repository type isn\'t in [\'Gateway\',\'Microservice\']')
         
        }
   
    }

}

