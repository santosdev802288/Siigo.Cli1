

<br>

![logo](https://www.siigo.com/wp-content/uploads/2019/05/Logo-Siigo.png)


<p align="center" >
  <img src="https://assetsdoc.blob.core.windows.net/assets/ic_logo@2x.png">
</p>


    A starter framework for k6 load tests written in TypeScript.

![cicd1](https://img.shields.io/badge/siigo-tech-brightgreen)
![cicd2](https://img.shields.io/badge/Siigo%20%E2%9D%A4%EF%B8%8F-JS-blue)
![cicd3](https://img.shields.io/badge/node-v14.13.1-green)
![cicd4](https://img.shields.io/badge/npm-6.14.8-brightgreen)
![cicd2](https://img.shields.io/badge/Siigo%20%E2%9D%A4%EF%B8%8F-Go-blue)
![cicd5](https://img.shields.io/badge/coverage%20100%25-%F0%9F%98%9C-blue)

<br>

<p align="center" >
  <img width="1200" src="https://assetsdoc.blob.core.windows.net/assets/example.svg">
</p>
<br>
<p align="center">
  <img width="1200" src="https://assetsdoc.blob.core.windows.net/assets/grafana.png">
</p>
<br>
<p align="center">
  <img width="1200" src="https://assetsdoc.blob.core.windows.net/assets/dd.png">
</p>


# Quick Start with Monitoring 🔥 👨‍🏫

<br>

1. Login with [acr](https://azure.microsoft.com/en-us/services/container-registry)
   
        docker login acraksqa.azurecr.io -u acrAksQa -p ZcgBUG708b=xU/99rC0M7e+FcKbrK32s
   
<br>

2. Install [docker](https://www.docker.com/products/docker-desktop)
and [docker-compose](https://docs.docker.com/compose/install/) installed on your machine.

<br>

3. Install dependencies using [yarn](https://yarnpkg.com/getting-started/install) :

        yarn install

<br>

4. Start the monitors using the following command:

        yarn monitors

<br>

5. Go to **localhost:3000** in your browser to login to Grafana with the username '**admin**' and the password '**admin**'.
    Add the [k6 dashboard](https://grafana.com/grafana/dashboards/2587) to **Grafana** by following these
    instructions: [Importing a Dashboad](https://grafana.com/docs/grafana/latest/reference/export_import/)

   <span style="font-size:2em;">☠️</span> | If you're running in **Windows** probably you'll need to use the full path for the local directories in the **volumes** sections of the [docker-compose.yaml](docker-compose.yml) file.
   :---: | :---

<br>

6.  Run [seed.ts](src/tests/seed.ts) script. This is an example of a script that you could use to 'seed' the application with test data before you run your
    performance tests.

        yarn seed

<br>

7.  Now run the test. This will run the [test.ts](/src/tests/test.ts) script, using **k6** installed in a docker, which outputs the results
    to **influxDB**. **Grafana** is used to visualise the results.

        yarn test


# ✨ Distributed testing and continues testing ☁️

After executing the command __*yo siigo: test.ak6*__ when this project was created you should see the pipeline of the project created in the portal of azure devops.

The Distributed tests and Continues Testing are parameterized by means of the [azure-pipeline.yaml](azure-pipelines.yml) file generated together with the project.

In this file you will find an initial configuration that you will have to adjust as the case may be.

### example 


With the following configuration, the load tests are started every time the Siigo.Microservice.Logger CICD pipeline has finished with the dev branch
    
    resources:
    
     pipelines:
      - pipeline: Parent
        source: 'Siigo.Microservice.Logger CICD' 
        project: 'Siigo'
        trigger:
          branches:
            - refs/heads/dev


The pipeline parameters indicate the environment and the type of test to run. In addition to other additional parameters.

    parameters:
        projectName: <%= config.name %>
        environment: qa
        test: load
        parallelism: 10
        claims: false

__*After parameterizing the pipeline and uploading the changes, you can launch the pipeline from the azure portal and the load test will launch within kubernetes.*__

# High-level architecture diagram

<br>
<br>
<p align="center" >
  <img width="1000" src="https://assetsdoc.blob.core.windows.net/assets/FrameworkDiagram.png">
</p>

As you can see from the framework diagram above, k6 modules allow for a lot of code re-use. Let's go into more detail
about each of the folders and what they do.

## **src** folder

All the code can be found in the `src` folder. And is written in TypeScript
using [types provided by k6](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/k6).


## **lib** folder

This folder contains bespoke `types` and helper functions. It's highly recommended that you unit test your helper
functions (e.g. with [Jest](https://jestjs.io/)). However I've not done that here, just to keep things simple.


## The models folder

This currently contains all classes, interfaces, constants definitions.  


## **actions** folder

The `actions` folder contains a script file for each user action. Each script file contains the requests that are sent
when a user performs that particular action (e.g. login). The `roles` folder (inside the `actions` folder) contains a
file for each user type and the actions they can perform.


## *roles folder*

There are three types of user (or roles) that use the Crocodile app. The first is a *public user* that isn't logged into
the system. They can query crocodiles, but can't create, update or delete them. The second are *crocodile owners* who
can log in and create, read and update crocodiles. The third are *admin* users who can create other users. The admin
users don't need to log in, as this is just a dummy app.


## **tests** folder

This is where you create your performance tests using the modules from the rest of the framework. `actions` are never
called directly, but always through the `role` performing them (see the `actions` and `roles` folders above).


## Checking your Code

Use:

`yarn check-types`

to check your code against type safety and the rules set in your [tsconfig.json file](tsconfig.json). You can also have
this running while you work using:

`yarn check-types:watch`.

**PLEASE NOTE** I haven't set up `ESLint` and `Prettier` which this framework, but it's recommended that you do so.


## Building your Code

[Babel](https://babeljs.io/) handles the transpiling of the code (see the [.babelrc](.babelrc) file in the root
directory), while [Webpack](https://webpack.js.org/) builds it (see the [webpack.config.js](webpack.config.js) file in
the root directory).


## Debugging k6 :bug:

It's easy to debug `k6` scripts. See the [k6 documentation](https://docs.k6.io/docs/debugging) for more details.


## Running in CI/CD Pipelines

`k6` has been designed to work with your `CI/CD` pipeline whatever tool you're using. There are examples
for [GitHub Actions](https://blog.loadimpact.com/load-testing-using-github-actions)
, [GitLab](https://blog.loadimpact.com/integrating-load-testing-with-gitlab)
, [CircleCI](https://github.com/loadimpact/k6-circleci-example)
, [Jenkins](https://github.com/loadimpact/k6-jenkins-example) and many others.
