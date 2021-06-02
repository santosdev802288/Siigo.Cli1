# Changelog
All notable changes to this project will be documented in this file.

## [2.1.0](https://dev.azure.com///compare/v2.0.5...v2.1.0) (2021-06-02)


### Features

* show available updates for generator-siigo ([084445a](https://dev.azure.com///commit/084445adb4958a093dc0375507adc33047db5dd1))
* **core:** add style checking using .editorconfig file ([78feec1](https://dev.azure.com///commit/78feec103ca8c45850522857e4968b44657d8aa5))
* Adding datadog trace injections ([be4ffeb](https://dev.azure.com///commit/be4ffebb9db780ebfbaf84e3cee427df69a4f8b5))
* Se actualizan los generadores de .Net para recibir un prefijo ([34e5cb3](https://dev.azure.com///commit/34e5cb30e246e29f29530ac239a86432a1c08c71))
* Updating dockerfile, chart and envs ([863df33](https://dev.azure.com///commit/863df330f5c5eb9346db927571a352a70b203cf0))
* **env:** add env to work with security context ([2c14815](https://dev.azure.com///commit/2c14815a7888c2a1c33e1481b4044fc2f361b929))
* **netcore:** create a checksum file ([80372fb](https://dev.azure.com///commit/80372fbe82709354b691f21666757171cdce8358))
* **package:** version 2.0.1 ([601c1f9](https://dev.azure.com///commit/601c1f9ea1aca7b79c69e50aa102401592239d1b))
* **scripts:** add bash installers ([822ca6a](https://dev.azure.com///commit/822ca6af4e7bddf57523607857ea4a1ff1759b05))


### Bug Fixes

* always check for important updates ([0c042fa](https://dev.azure.com///commit/0c042fa4787489c5e075f08ba4ac9f5a35ea3851))
* ESLint problems ([0b49d7e](https://dev.azure.com///commit/0b49d7e65aea7b277c30b8daa035cecab4fa3c20))
* **core:** sort directives ([31fcea2](https://dev.azure.com///commit/31fcea2436b47f867a9969c092238693d80536ae))
* add archetype-node registry ([d49774e](https://dev.azure.com///commit/d49774e13e6a56ae02bfaf73fe58f6cdc2123e34))
* add Dockefile content for net core 5 type ([2bbbce3](https://dev.azure.com///commit/2bbbce383437b36a4b0d628be22093ad805c03b2))
* add Dockerfile content for net core 5 ([7c0eaf2](https://dev.azure.com///commit/7c0eaf2d26116230c7efa42a88d77f75fd665841))
* add support for old .net core 3 libraries ([3d48822](https://dev.azure.com///commit/3d4882264c848195ee8fcb577f23927438eb6a83))
* save config in user home folder ([cf90aae](https://dev.azure.com///commit/cf90aae191f7e2c9160c9cc0a69090ebe507c835))
* update npmrc token ([e69aee6](https://dev.azure.com///commit/e69aee6c04803258eef993ff0ef014d0b46ba35a))
* update registry token ([3b0cde3](https://dev.azure.com///commit/3b0cde31311e7331b0a03c6134da1f77f7371cc9))
* use variable on entrypoint for net5 ([08c761a](https://dev.azure.com///commit/08c761ab3ee5eba7ffee75de92f3e143d45a5dc3))
* **cmd:** remove commands to remove folders ([b143656](https://dev.azure.com///commit/b143656761748ba43c481692a17ffc737ab6e718))
* **files:** remove dot files ([6819a62](https://dev.azure.com///commit/6819a622742cceeb11ab4e77e3934dbb8f06ce26))

# 2.0.4 (2021-04-06)

### Features

* The parameter cicd was added in the gateway generator
* Library updated in .Net templates SlimMessageBus Version="1.3.0"
* Library updated in .Net templates SlimMessageBus.Host.AspNetCore Version="1.4.0"
* Library updated in .Net templates SlimMessageBus.Host.Kafka Version="1.11.0"
* Library updated in .Net templates SlimMessageBus.Host.Serialization.Json Version="1.4.0"
* The README.md was updated


## 2.0.3 (2021-01-19)


### Bug Fixes

* **cmd:** remove commands to remove folders ([b143656](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commits/b143656761748ba43c481692a17ffc737ab6e718))
* **files:** remove dot files ([6819a62](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commits/6819a622742cceeb11ab4e77e3934dbb8f06ce26))

## 2.0.2 (2021-01-19)


### Bug Fixes

* **cmd:** remove commands to remove folders ([b143656](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commits/b143656761748ba43c481692a17ffc737ab6e718))


## 2.0.1 (2020-12-10)


### Features

* **env:** add env to work with security context ([2c14815](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commits/2c14815a7888c2a1c33e1481b4044fc2f361b929))
* **package:** version 2.0.1 ([601c1f9](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commits/601c1f9ea1aca7b79c69e50aa102401592239d1b))
* **scripts:** add bash installers ([822ca6a](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commits/822ca6af4e7bddf57523607857ea4a1ff1759b05))



# 2.0.0 (2020-12-09)


### Features

* **command:** add cicd command to automate integration with kubernetes ([d82d414](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commits/d82d4142668bc36f1867a5818f8f75dfbc2dd070))
* **command:** add core command to generate .net core microservices ([4111dd7](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commits/4111dd749abc24289a7b302a0b0c5c4d504e67be))
* **command:** add core-cqrs commando to generate commands and queries for .net core microservices ([1a77f6c](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commits/1a77f6c6e53ed6ce691d224dba1472e09614c1de))
* **command:** add gateway command for generate api gateway projects with krakend ([027e2c5](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commits/027e2c566998587540f691f22a8731059b3ec11e))
* **command:** add module command to create a new nestjs module ([579649e](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commits/579649e30ca01ea8ee16ec3ba207af242b2fe0cb))
* **command:** add node commando for generate microservices with nestjs ([343800d](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commits/343800d264eaa383362761114e12e02e330ea051))
* **init:** init project ([fa80f21](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commits/fa80f211b989c4792d51e1e5d4220c834037bea2))
* **module:** utils functions to work with files and directories ([4d5ec75](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commits/4d5ec7571f69d2e6fd59b0eedca17778a8b268ab))
