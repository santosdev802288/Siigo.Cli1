# Siigo CLI  

<br>

![logo](https://www.siigo.com/wp-content/uploads/2019/05/Logo-Siigo.png)

<br>

> <span style="font-size=2em; width: 2em;">🔥</span> With Siigo CLI is easy the creation of different resources and projects, like microservices (writing in Golang, .Net Core and Node JS), Api Gateway, CI CD and more.

<br>

![cicd1](https://img.shields.io/badge/siigo-tech-brightgreen)
![cicd2](https://img.shields.io/badge/I%20%E2%9D%A4%EF%B8%8F-JS-blue)
![cicd3](https://img.shields.io/badge/node-v14.13.1-green)
![cicd4](https://img.shields.io/badge/npm-6.14.8-brightgreen)
![cicd5](https://img.shields.io/badge/coverage%20100%25-%F0%9F%98%9C-blue)

<br>

<span style="font-size:2em;">☠️</span> | Before to start to use this CLI , it's important to follow the instructions. If you have some errors during the Siiglo ClI installation process or when you're using it, read those exceptions carefully, they can give you a lot of information about how to fix them. 
:---: | :---


    The defaults values are taken from the folder where the ClI is running.

## 🛠️ Requirements
- [Node](https://nodejs.org/en/download/)   
- [Node package manager](https://docs.npmjs.com/cli/install)
- [Git](https://git-scm.com/downloads)
- [Azure cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)


## ⚙️ Installation MacOs and Linux
Download the following sh file and execute it with TOKEN argument. 
Generate your own [personal access token](https://dev.azure.com/SiigoDevOps/_usersSettings/tokens) and replace it in {YOUR_TOKEN}.

    curl -L https://assetsdoc.blob.core.windows.net/installers/Install.sh | TOKEN={YOUR_TOKEN} sh -

## 🕵✋️ Installation Windows Power Shell
Download the following ps1 file and execute it. 
Generate your own [personal access token](https://dev.azure.com/SiigoDevOps/_usersSettings/tokens).
    
    Invoke-RestMethod -Uri "https://assetsdoc.blob.core.windows.net/installers/install.ps1" -Outfile "install.ps1"; .\install.ps1

## 👷 Work flow
    
 1. Create repository.
 2. Clone the repository created in the previous step. 
 3. Run the commands in the root of the project.

## ⚡ Generators

- [Golang](#🔥-golang)
  - [new project](#new-project)
- [NodeJs](#‍👩‍🏫-nodejs)
  - [new project](#new-project)
  - [basic module](#new-basic-module)
- [CICD](#🚀-cicd)
- [AK6 Load Testing](#🔫-performance-testing-⚡)
- [Api Gateway](#🔱-api-gateway)
- [Datadog](#🐶datadog)

## 🔥 Golang

### New project

This command helps automating the creation of microservices with a minimal configuration in it.

### Using

Create a new project with default values
    
    yo siigo:bolt --personal-token {YOUR_TOKEN}

#### Example
In the following [example](https://assetsdoc.blob.core.windows.net/assets/golang.svg), you can see how to create a microservice in golang.

#### Flags and descriptions
Run *_yo siigo:bolt --help_* to see the configuration description, data type and default value for all the parameters.
    
    ╭━━━╮           ╭╮   ╭╮  ╭╮╭━━━╮
    ┃╭━╮┃           ┃┃   ┃╰╮╭╯┃┃╭━╮┃
    ┃╰━━┳┳┳━━┳━━╮╭━━┫┃╭╮ ╰╮┃┃╭╯╰╯╭╯┃
    ╰━━╮┣╋┫╭╮┃╭╮┃┃╭━┫┃┣┫  ┃╰╯┃ ╭━╯╭╯
    ┃╰━╯┃┃┃╰╯┃╰╯┣┫╰━┫╰┫┃  ╰╮╭╯ ┃┃╰━╮
    ╰━━━┻┻┻━╮┣━━┻┻━━┻━┻╯   ╰╯  ╰━━━╯
    ╭━╯┃
    ╰━━╯╭──────────────────────────╮
    │  Siigo Generator Golang. │
    ╰──────────────────────────╯
    
    Usage:
    yo siigo:bolt [options]
    
    Options:
    -h,    --help            # Print the generator's options and usage
    --skip-cache      # Do not remember prompt answers                                                               Default: false
    --skip-install    # Do not automatically install dependencies                                                    Default: false
    --force-install   # Fail on install dependencies error                                                           Default: false
    --ask-answered    # Show prompts for already configured options                                                  Default: false
    -pn,   --project-name    # Name project.                                                                                Default: example
    -d,    --description     # Description project.
    -a,    --author          # Description for author                                                                       Default: juand
    --personal-token  # Personal token. Generate your token https://dev.azure.com/SiigoDevOps/_usersSettings/tokens


## ‍👩‍🏫 NodeJS

### New project

This command helps automating the creation of microservices with a minimal configuration in it.

### Using

Create a new project with default values
    
    yo siigo:node

Create a new project setting description
    
    yo siigo:node --d "this is a new project"

#### Example
In the following [example](https://assetsdoc.blob.core.windows.net/assets/node.svg), you can see how to create a microservice in nodejs with a newly cloned repository.

#### Flags and descriptions
Run *_yo siigo:node --help_* to see the configuration description, data type and default value for all the parameters.

    $ yo siigo:node --help   

         _-----_     
        |       |    
        |--(o)--|    ╭──────────────────────────╮
       `---------´   │  Siigo Generator NodeJS. │
        ( _´U`_ )    ╰──────────────────────────╯
        /___A___\   /
         |  ~  |     
       __'.___.'__   
     ´   `  |° ´ Y ` 
    
    Usage:
      yo siigo:node [options]
    
    Options:
      -h,    --help           # Print the generator's options and usage
             --skip-cache     # Do not remember prompt answers               Default: false
             --skip-install   # Do not automatically install dependencies    Default: false
             --force-install  # Fail on install dependencies error           Default: false
             --ask-answered   # Show prompts for already configured options  Default: false
      -pn,   --project-name   # Name project.                                Default: Siigo.Microservice.MyProduct
      -d,    --description    # Description project.
      -a,    --author         # Description for author                       Default: juancorrea


#### New basic module

This command helps automating the creation of modules with solid principles. 

#### Using

Create a new module
    
    yo siigo:module anyname

#### Example
In the following [example](https://assetsdoc.blob.core.windows.net/assets/module.svg) you can see the step by step how to create a new NestJS module.

#### Flags and description
Run *_yo siigo:module --help_* to see the configuration description, data type and default value for all the parameters.

    $ yo siigo:module --help 
    
         _-----_     
        |       |    ╭──────────────────────────╮
        |--(o)--|    │   Siigo generator Nest   │
       `---------´   │          module.         │
        ( _´U`_ )    ╰──────────────────────────╯
        /___A___\   /
         |  ~  |     
       __'.___.'__   
     ´   `  |° ´ Y ` 
    
    Usage:
      yo siigo:module <name> [options]
    
    Options:
      -h,   --help           # Print the generator's options and usage
            --skip-cache     # Do not remember prompt answers               Default: false
            --skip-install   # Do not automatically install dependencies    Default: false
            --force-install  # Fail on install dependencies error           Default: false
            --ask-answered   # Show prompts for already configured options  Default: false
    
    Arguments:
      name    Type: String  Required: true

## 🔱 Api Gateway
[KrakenD](https://www.krakend.io/) is more than a typical proxy that forwards clients to backend services. It's a powerful engine that can transform, aggregate or remove data from your own or third party services. 

### Motivation
This command helps automating the creation and configuration of an API gateway when there is a new namespace created in kubernetes.

### Using

Create a new Api Gateway exposing port 4200.  
    
    yo siigo:gateway --project-name myproduct --namespace-k8s my-new-namespace --port 4200 


### Example 
In the following [example](https://assetsdoc.blob.core.windows.net/assets/gateway.svg) you can see the step by step how to create an Api Gateway with CICD.


### Flags and description
Run *_yo siigo:gateway --help_* to see the configuration description, data type and default value for all the parameters.

         _-----_     
        |       |    ╭──────────────────────────╮
        |--(o)--|    │    Siigo Generator Api   │
       `---------´   │         Gateway.         │
        ( _´U`_ )    ╰──────────────────────────╯
        /___A___\   /
         |  ~  |     
       __'.___.'__   
     ´   `  |° ´ Y ` 
    
    Usage:
      yo siigo:gateway [options]
    
    Options:
      -h,     --help           # Print the generator's options and usage
              --skip-cache     # Do not remember prompt answers                                                                                                 Default: false
              --skip-install   # Do not automatically install dependencies                                                                                      Default: false
              --force-install  # Fail on install dependencies error                                                                                             Default: false
              --ask-answered   # Show prompts for already configured options                                                                                    Default: false
      -org,   --organization   # Url of the organization in azure devops.                                                                                       Default: https://dev.azure.com/SiigoDevOps
      -p,     --project        # Project in azure devops.                                                                                                       Default: Siigo
      -pn,    --pipeline-name  # Pipeline name in azure devops.                                                                                                 Default: Siigo.Gateway.Configuration CICD
      -f,     --folder         # Name of the folder that will contain the pipeline.                                                                             Default: Siigo.Gateway.Configuration
      -e,     --environment    # Environment that has access to the cluster. https://dev.azure.com/SiigoDevOps/Siigo/_environments                              Default: aks
      -cv,    --chart-version  # Siigo helm chart version. https://dev.azure.com/SiigoDevOps/Architecture/_git/Siigo.Chart/tags                                 Default: 0.2.2
              --project-name   # Used in Helm chart name, tag docker image and sonar. Each project name is prefixed with api-gateway.
      -ns,    --namespace-k8s  # Namespace in kubernetes configured in the environment.
              --port           # Port to expose the api gateway in the ingress controller. Confirm with architecture team if that port that you need its open.
              --cicd           # Enable the commands to create the CI/CD process in Azure DevOps                                                                Default: yes

### Did something go wrong?
If for some reason the deployment process failed, and you need to try it again, you can use the following [tool]() to clean the helm chart in kubernetes. The unique parameter needed is the value passed in *__--project-name__* flag.

## 🚀 CICD

CI/CD is one of the best practices for devops teams to implement. It is also an agile methodology best practice, as it enables software development teams to focus on meeting business requirements, code quality, and security because deployment steps are automated.

### Motivation
Automating the configuration of continuous integration and continuous delivery in environments with Kubernetes, Istio and Azure Devops.

### Using

Using default values and set minimum required parameters
    
    yo siigo:cicd --project-name ms-myproduct --namespace-k8s siigo-catalog 

Using --e to configure the environment with aliases and --dll to configure the main project dll
    
    yo siigo:cicd --project-name ms-myproduct --ns 'siigo-catalog' --e 'aks' --dll Siigo.MyProductService.Api

### Example .Net Core
In the following [example](https://assetsdoc.blob.core.windows.net/assets/cicd.svg) you can see how to integrate your .net core microservice with Kubernetes.

### Example NodeJS
In the following [example](https://assetsdoc.blob.core.windows.net/assets/cicd-node.svg) you can see how to integrate your nodejs microservice with Kubernetes.


### Flags and description
Run *_yo siigo:cicd --help_* to see the configuration description, data type and default value for all the parameters.

         _-----_     
        |       |    
        |--(o)--|    ╭──────────────────────────╮
       `---------´   │   Siigo Generator CICD.  │
        ( _´U`_ )    ╰──────────────────────────╯
        /___A___\   /
         |  ~  |     
       __'.___.'__   
     ´   `  |° ´ Y ` 
    
    Usage:
      yo siigo:cicd [options]
    
    Options:
      -h,     --help           # Print the generator's options and usage
              --skip-cache     # Do not remember prompt answers                                                                                      Default: false
              --skip-install   # Do not automatically install dependencies                                                                           Default: false
              --force-install  # Fail on install dependencies error                                                                                  Default: false
              --ask-answered   # Show prompts for already configured options                                                                         Default: false
      -org,   --organization   # Url of the organization in azure devops.                                                                            Default: https://dev.azure.com/SiigoDevOps
      -p,     --project        # Project in azure devops.                                                                                            Default: Siigo
      -pn,    --pipeline-name  # Pipeline name in azure devops.                                                                                      Default: Siigo.Microservice.Prueba CICD
      -f,     --folder         # Name of the folder that will contain the pipeline.                                                                  Default: Siigo.Microservice.Prueba
      -e,     --environment    # Environment that has access to the cluster. https://dev.azure.com/SiigoDevOps/Siigo/_environments                   Default: aks
      -cv,    --chart-version  # Siigo helm chart version. https://dev.azure.com/SiigoDevOps/Architecture/_git/Siigo.Chart/tags                      Default: 0.2.2
      -d,     --dll            # Project which the microservice starts. (Siigo.{Name}.Api). If --type is set to 'node', this value will be ignored.  Default: null
              --project-name   # Used in Helm chart name, docker image and sonar.
      -ns,    --namespace-k8s  # Namespace in kubernetes configured in the environment.
      -st,    --sonar-token    # Sonar token to publish metrics. If --type is set to 'node', this value will be ignored.                             Default: null
      -t,     --type           # Project type. (node, netcore or net5)                                                                               Default: net5 
      
> **⚠️ WARNING**: If you set --environment option, remember: you only need pass
>the name without the prefix of the environment(qa, dev, prod). Example 'qa aks' is aks and 'prod aks chile' is aks chile.  

## 🐶 Datadog
[Datadog](https://www.datadoghq.com/) is an observability service for cloud-scale applications, providing monitoring of servers, databases, tools, and services, through a SaaS-based data analytics platform.

### Motivation
This command helps to automate the creation and configuration of an SLO by each microservice and its respective dashboard.

### Using

Create a new SLO project in Datadog.

    yo siigo:datadog --ms-name mymicroservice


### Example
In the following [example](https://assetsdoc.blob.core.windows.net/assets/datadog.gif) you can see the step by step how to create a SLO.


### Flags and description
Run *_yo siigo:datadog --help_* to see the configuration description, data type and default value for all the parameters.

         _-----_     
        |       |    ╭──────────────────────────╮
        |--(o)--|    │    Siigo Generator Api   │
       `---------´   │         Datadog.         │
        ( _´U`_ )    ╰──────────────────────────╯
        /___A___\   /
         |  ~  |     
       __'.___.'__   
     ´   `  |° ´ Y ` 
    
    Usage:
      yo siigo:datadog [options]
    
    Options:
      -h,     --help           # Print the generator's options and usage
              --skip-cache     # Do not remember prompt answers                                                                                                 Default: false
              --skip-install   # Do not automatically install dependencies                                                                                      Default: false
              --force-install  # Fail on install dependencies error                                                                                             Default: false
              --ask-answered   # Show prompts for already configured options                                                                                    Default: false
      -msn,   --ms-name        # Microservice name.                                                                                                             Default: false
### Did something go wrong?
If for some reason the deployment process failed, and you need to try it again, you can use the following [tool]() to clean the helm chart in kubernetes. The unique parameter needed is the value passed in *__--project-name__* flag.


### Customize pipeline

If you need to configure your pipeline that was generated, you can check out the following [documentation](https://dev.azure.com/SiigoDevOps/Architecture/_git/Siigo.Pipeline?path=%2Fnetcore).

### Customize chart

[Helm](https://helm.sh/) templates offer built-in objects. One of the built-in objects is [Values](https://helm.sh/docs/chart_template_guide/values_files/). This object provides access to values passed into the [chart](https://dev.azure.com/SiigoDevOps/Architecture/_git/Siigo.Chart). To  customize the values by default you can modify the environment files in the **_.docker/envs_** folder of your project.

### Did something go wrong?

If for some reason the deployment process failed, and you need to try it again, you can use the following [tool]() to clean the helm chart in kubernetes.


## 🔫 Performance Testing ⚡
A starter framework for k6 load tests written in TypeScript.

### Using 
Generate a new ak6 project with monitoring and distributed testing 

1. Create a folder with prefix 'Siigo.Test' and move to him.
<br>    
    Windows powershell:
    
        New-Item -Path 'Siigo.Test.{PutHereYourProjectName}' -ItemType Directory
    
    linux or mac:
    
        mkdir Siigo.Test.{PutHereYourProjectName}
            
    move to the folder: 
        
        cd Siigo.Test.{PutHereYourProjectName}

2. Create a repository

        yo siigo:git 

3. Generate an ak6 project

        yo siigo:test-ak6     


## 📡 S-Kub
[SKub](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.SKub) It is a service for large data transfer, it is distributed, available and reliable. Its architecture is inspired by Apache Flume and is made with Apache Spark. It has two concepts that allow its operation. Source and Sinks.For more information check the project documentation

### Motivation

These commands allow automation and easy handling of the S-Kub tool and implementation. Allowing integration with the Spark operator in Kubernetes, its configuration and use being transparent for developers

### Using

For the use it consists of two steps mainly.
1. The generation of the YAML configuration file, where the configuration of the source, sink and sink validation will be specified for the correct operation of the process.

    First fenerate a S-Kub yaml configuration file in your current path.  
    
        yo siigo:skub-template

    Next, the option to select the source between SQL, Mongo and Cassandra will be shown. Later it will ask you if the SQL connection is a connection to the multitenant.

        ╭━━━╮           ╭╮   ╭╮  ╭╮╭━━━╮
        ┃╭━╮┃           ┃┃   ┃╰╮╭╯┃┃╭━╮┃
        ┃╰━━┳┳┳━━┳━━╮╭━━┫┃╭╮ ╰╮┃┃╭╯╰╯╭╯┃
        ╰━━╮┣╋┫╭╮┃╭╮┃┃╭━┫┃┣┫  ┃╰╯┃ ╭━╯╭╯
        ┃╰━╯┃┃┃╰╯┃╰╯┣┫╰━┫╰┫┃  ╰╮╭╯ ┃┃╰━╮
        ╰━━━┻┻┻━╮┣━━┻┻━━┻━┻╯   ╰╯  ╰━━━╯
            ╭━╯┃╭──────────────────────────╮
            ╰━━╯│      Siigo generator     │
                │  Migration job template. │
                ╰──────────────────────────╯

        ? Select the source (Use arrow keys)
        ❯ SQL 
        KAFKA 
        MONGO 
        CASSANDRA 

    Next, you will select the Sink (Kafka, SQL, Mongo and Cassandra).

        ╭━━━╮           ╭╮   ╭╮  ╭╮╭━━━╮
        ┃╭━╮┃           ┃┃   ┃╰╮╭╯┃┃╭━╮┃
        ┃╰━━┳┳┳━━┳━━╮╭━━┫┃╭╮ ╰╮┃┃╭╯╰╯╭╯┃
        ╰━━╮┣╋┫╭╮┃╭╮┃┃╭━┫┃┣┫  ┃╰╯┃ ╭━╯╭╯
        ┃╰━╯┃┃┃╰╯┃╰╯┣┫╰━┫╰┫┃  ╰╮╭╯ ┃┃╰━╮
        ╰━━━┻┻┻━╮┣━━┻┻━━┻━┻╯   ╰╯  ╰━━━╯
            ╭━╯┃╭──────────────────────────╮
            ╰━━╯│      Siigo generator     │
                │  Migration job template. │
                ╰──────────────────────────╯

        ? Select the source SQL
        ? Select the target (sink) (Use arrow keys)
        ❯ SQL 
        KAFKA 
        MONGO 
        CASSANDRA 

    If the migration requires Sink Validation, it will show you the corresponding options (Kafka, SQL, Mongo and Cassandra).

        ╭━━━╮           ╭╮   ╭╮  ╭╮╭━━━╮
        ┃╭━╮┃           ┃┃   ┃╰╮╭╯┃┃╭━╮┃
        ┃╰━━┳┳┳━━┳━━╮╭━━┫┃╭╮ ╰╮┃┃╭╯╰╯╭╯┃
        ╰━━╮┣╋┫╭╮┃╭╮┃┃╭━┫┃┣┫  ┃╰╯┃ ╭━╯╭╯
        ┃╰━╯┃┃┃╰╯┃╰╯┣┫╰━┫╰┫┃  ╰╮╭╯ ┃┃╰━╮
        ╰━━━┻┻┻━╮┣━━┻┻━━┻━┻╯   ╰╯  ╰━━━╯
            ╭━╯┃╭──────────────────────────╮
            ╰━━╯│      Siigo generator     │
                │  Migration job template. │
                ╰──────────────────────────╯

        ? Select the source KAFKA
        ? Select the target (sink) KAFKA
        ? Do yo want to validate the target (sink)? Yes
        ? Select the target to validate (sink - validation) 
        SQL 
        KAFKA 
        ❯ MONGO 
        CASSANDRA 

    Once the selection is finished, the command will generate a predefined YAML configuration file, you must enter and change the corresponding information (Columns, Connection strings, Multitenant configuration, Queries, etc.)


2. Start-up or execution of the S-Kub process, once the YAML file has been verified and configured, it will be executed and published in K8's. There are two configurations, recurring executions or single execution. For recurring executions it is necessary to specify the cron job expression with the necessary frequency.

        ╭━━━╮           ╭╮   ╭╮  ╭╮╭━━━╮
        ┃╭━╮┃           ┃┃   ┃╰╮╭╯┃┃╭━╮┃
        ┃╰━━┳┳┳━━┳━━╮╭━━┫┃╭╮ ╰╮┃┃╭╯╰╯╭╯┃
        ╰━━╮┣╋┫╭╮┃╭╮┃┃╭━┫┃┣┫  ┃╰╯┃ ╭━╯╭╯
        ┃╰━╯┃┃┃╰╯┃╰╯┣┫╰━┫╰┫┃  ╰╮╭╯ ┃┃╰━╮
        ╰━━━┻┻┻━╮┣━━┻┻━━┻━┻╯   ╰╯  ╰━━━╯
        ╭━╯┃
        ╰━━╯╭──────────────────────────╮
        │  Siigo Skub generator. │
        ╰──────────────────────────╯

        Usage:
        yo siigo:skub [options]

        Options:
        -h,    --help           # Print the generator's options and usage
                --skip-cache     # Do not remember prompt answers               Default: false
                --skip-install   # Do not automatically install dependencies    Default: false
                --force-install  # Fail on install dependencies error           Default: false
                --ask-answered   # Show prompts for already configured options  Default: false
        -dn,   --domain         # Domain name.
        -fp,   --file-path      # Yaml configuration file path.
        -c,    --context        # Cluster context
        -r,    --replicas       # Replicas number                              Default: 1
        -ce,   --cron           # Cron expression


    Example:

        yo siigo:skub --dn evil --fp migration.yaml --context QACOLCrossPlaneCluster --replicas 3

### Example 
In the following [example](https://asciinema.org/a/MR6AnoIdF94sdfQx9VbtDDlyY?speed=2) you can see the step by step how to generate a SKub configuration file


### Flags and description
Run *_yo siigo:skub --help_* to see the configuration description, data type and default value for all the parameters.

### Did something go wrong?
If for some reason the deployment process fails, you should verify the correct structure and values within the migration.yaml configuration file and run the process again.

## Contributing

### Requirements
To contribute to the project and make a pull request you must follow these requirements: 

- document the reason for the change or the new feature as detailed as possible. 
- use [commitizen](https://github.com/commitizen/cz-cli) and [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) specifying the change made

  - feat: A new feature 
  - fix: A bug fix 
  - docs: Documentation only changes 
  - style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) 
  - refactor: A code change that neither fixes a bug nor adds a feature 
  - perf: A code change that improves performance 
  - test: Adding missing tests or correcting existing tests
  - build:    Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) 
  - ci:       Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) 
  - chore:    Other changes that don't modify src or test files 
  - revert:   Reverts a previous commit 

 - the new command or flag must be self-described by --help 
 - control the inputs and throw exceptions that guide the developer to use the command successfully
 - perform functional tests on Linux and Windows.
 
### Build 

  - clone master branch  
  - create a new branch 
  - install dependencies
  - npm run build:dev
  - execute [__*npm link*__](https://docs.npmjs.com/cli/v6/commands/npm-link) in the root of the project 

Now all the commands with __*yo siigo:(core, node, gateway, cicd, etc.)*__ point to your local repository.


## 📚 TODO
- [ ] [Unit testing](https://yeoman.io/authoring/testing.html)
- [ ] [Compose](https://yeoman.io/authoring/composability.html) generators
- [ ] Integrate whit TypeScript
- [ ] [Post production](https://github.com/cirocosta/asciinema-edit) to sample videos 
