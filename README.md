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
- [.Net Core](#👨‍🏫-.net-core)
  - [new project](#new-net-core-project)
  - [create commands and queries](#cqrs)
- [.Net 5 grpc client](#🗿-.net-5-grpc-client)
- [.Net 5 grpc server](#💪-.net-5-grpc-server)
- [CICD](#🚀-cicd)
- [AK6 Load Testing](#🔫-performance-testing-⚡) 
- [Api Gateway](#🔱-api-gateway)

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

## 👨‍🏫 .Net Core

### New net core project

This command helps automating the creation of microservices with a minimal configuration in it.

#### Using

Create a new microservice with a custom personal token.
Generate your own [personal access token](https://dev.azure.com/SiigoDevOps/_usersSettings/tokens) and replace it in {YOUR_TOKEN}.
 
    yo siigo:core --personal-token {YOUR_TOKEN}

Create a new microservice with a [personal access token](https://dev.azure.com/SiigoDevOps/_usersSettings/tokens) and custom name. By default, --name is the name of root folder. 
    
    yo siigo:core --personal-token {YOUR_TOKEN} --name PaymentMethods

#### Example 
In the following [example](https://assetsdoc.blob.core.windows.net/assets/core.svg) you can see how to create a microservice in .Net Core with a newly cloned repository.


#### Flags and description

    $ yo siigo:core --help 
    
         _-----_     
        |       |    ╭──────────────────────────╮
        |--(o)--|    │   Siigo Generator .Net   │
       `---------´   │           Core.          │
        ( _´U`_ )    ╰──────────────────────────╯
        /___A___\   /
         |  ~  |     
       __'.___.'__   
     ´   `  |° ´ Y ` 
    
    Usage:
      yo siigo:core [options]
    
    Options:
      -h,   --help            # Print the generator's options and usage
            --skip-cache      # Do not remember prompt answers                                               Default: false
            --skip-install    # Do not automatically install dependencies                                    Default: false
            --force-install   # Fail on install dependencies error                                           Default: false
            --ask-answered    # Show prompts for already configured options                                  Default: false
            --name            # Project name                                                                 Default: MyMicro
            --personal-token  # Generate your token https://dev.azure.com/SiigoDevOps/_usersSettings/tokens

### CQRS

Create queries and commands with their handlers quickly in your project.

#### Using CQRS

Create a new command or query

    yo siigo:crqs

#### Example of CQRS

In the following [example](https://assetsdoc.blob.core.windows.net/assets/cqrs.svg) you can see how to create a command and a query.

## 🗿 .Net 5 grpc client

### 1. New net core project
This command helps automating the creation of microservices with a minimal configuration in it based on .Net 5 and gRPC client mode.

#### Using

Create a new microservice with a custom personal token.
Generate your own [personal access token](https://dev.azure.com/SiigoDevOps/_usersSettings/tokens) and replace it in {YOUR_TOKEN}.
 
    yo siigo:core-grpc-client --personal-token {YOUR_TOKEN}

Create a new microservice with a [personal access token](https://dev.azure.com/SiigoDevOps/_usersSettings/tokens) and custom name. By default, --name is the name of root folder. 
    
    yo siigo:core-grpc-client --personal-token {YOUR_TOKEN} --name PaymentMethods

#### Example 
In the following [example](https://assetsdoc.blob.core.windows.net/assets/core.svg) you can see how to create a microservice in .Net Core with a newly cloned repository.


#### Flags and description

    $ yo siigo:core-grpc-client --help 
    
         _-----_     
        |       |    ╭──────────────────────────╮
        |--(o)--|    │   Siigo Generator .Net   │
       `---------´   │     5.0 grpc Client.     │
        ( _´U`_ )    ╰──────────────────────────╯
        /___A___\   /
         |  ~  |     
       __'.___.'__   
     ´   `  |° ´ Y ` 
    
    Usage:
      yo siigo:core-grpc-client [options]
    
    Options:
      -h,   --help            # Print the generator's options and usage
            --skip-cache      # Do not remember prompt answers                                               Default: false
            --skip-install    # Do not automatically install dependencies                                    Default: false
            --force-install   # Fail on install dependencies error                                           Default: false
            --ask-answered    # Show prompts for already configured options                                  Default: false
            --name            # Project name                                                                 Default: MyMicro
            --personal-token  # Generate your token https://dev.azure.com/SiigoDevOps/_usersSettings/tokens


## 💪 .Net 5 grpc server

### 1. New net core project
This command helps automating the creation of microservices with a minimal configuration in it based on .Net 5 and gRPC client mode.

#### Using

Create a new microservice with a custom personal token.
Generate your own [personal access token](https://dev.azure.com/SiigoDevOps/_usersSettings/tokens) and replace it in {YOUR_TOKEN}.
 
    yo siigo:core-grpc-server --personal-token {YOUR_TOKEN}

Create a new microservice with a [personal access token](https://dev.azure.com/SiigoDevOps/_usersSettings/tokens) and custom name. By default, --name is the name of root folder. 
    
    yo siigo:core-grpc-server --personal-token {YOUR_TOKEN} --name PaymentMethods

#### Flags and description

    $ yo siigo:core-grpc-server --help 
    
         _-----_     
        |       |    ╭──────────────────────────╮
        |--(o)--|    │   Siigo Generator .Net   │
       `---------´   │     5.0 grpc Server.     │
        ( _´U`_ )    ╰──────────────────────────╯
        /___A___\   /
         |  ~  |     
       __'.___.'__   
     ´   `  |° ´ Y ` 
    
    Usage:
      yo siigo:core-grpc-client [options]
    
    Options:
      -h,   --help            # Print the generator's options and usage
            --skip-cache      # Do not remember prompt answers                                               Default: false
            --skip-install    # Do not automatically install dependencies                                    Default: false
            --force-install   # Fail on install dependencies error                                           Default: false
            --ask-answered    # Show prompts for already configured options                                  Default: false
            --name            # Project name                                                                 Default: MyMicro
            --personal-token  # Generate your token https://dev.azure.com/SiigoDevOps/_usersSettings/tokens


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


### Customize pipeline

If you need to configure your pipeline that was generated, you can check out the following [documentation](https://dev.azure.com/SiigoDevOps/Architecture/_git/Siigo.Pipeline?path=%2Fnetcore).

### Customize chart

[Helm](https://helm.sh/) templates offer built-in objects. One of the built-in objects is [Values](https://helm.sh/docs/chart_template_guide/values_files/). This object provides access to values passed into the [chart](https://dev.azure.com/SiigoDevOps/Architecture/_git/Siigo.Chart). To  customize the values by default you can modify the environment files in the **_.docker/envs_** folder of your project.

### Did something go wrong?

If for some reason the deployment process failed, and you need to try it again, you can use the following [tool]() to clean the helm chart in kubernetes.


## 🔫 Performance Testing  ⚡
A starter framework for k6 load tests written in TypeScript.

### Using 
Generate a new ak6 project with monitoring and distributed testing 

1. Create a folder with prefix 'Siigo.Test' and move to him.
<br>    
    Windows powershell:
    
        New-Item -Path 'Siigo.Test.PutHereYourProjectName' -ItemType Directory
    
    linux or mac:
    
        mkdir Siigo.Test.PutHereYourProjectName
            
    move to the folder: 
        
        cd Siigo.Test.PutHereYourProjectName

2. Create a repository

        yo siigo:git 

3. Generate an ak6 project

        yo siigo:test.ak6     

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
