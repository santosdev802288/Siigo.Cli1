# Changelog
All notable changes to this project.

## [2.6.0](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/compare/v2.5.1...v2.6.0) (2021-12-21)


### Features

* :zap: feature-git and bug-ak6 ([0581c25](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/0581c25011755e59b90f6bb99fa76c0ecd5384ab))
* **api-gateway:** use latest chart version and owner tags ([c557cb6](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/c557cb65d28a9e6cd33b55f36c9a71a462c21c59))
* **golang:** update protobuf modules ([56de99b](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/56de99be74149cf332d9137f74488cdec11d5ed2))
* **test-ak6:** send metrics to influxdb on cluster ([9f7af08](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/9f7af085cc3966b3cdd3c25d082a6b705810a283))


### Bug Fixes

* **cicd:** add missing health check path and disable readOnlyRootFilesystem ([353e264](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/353e2641ba65ee3489b18fb5848856bd69d55488))
* **cicd:** use correct values.yaml path ([3385e96](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/3385e962211b01bf3687ee7425275a4c13a14864))
* disable statistics on test ([3fa08c9](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/3fa08c94d24ed7e7f2f141f59b24151396c29163))
* **test-ak6:** reduce default VUs for load test ([756e966](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/756e9666a85b2ea5812b10a5b6bcf48487cc0ab7))

### [2.5.1](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/compare/v2.5.0...v2.5.1) (2021-11-05)


### Bug Fixes

* create only once statistic scheme ([7824c72](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/7824c7278aecf35bcce8bf058e54ffe92caaf2ef))

## [2.5.0](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/compare/v2.3.0...v2.5.0) (2021-11-04)


### Features

* **bolt:** add siigo core logs ([0994b6a](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/0994b6a370ed6dcef2bd85c06cbf66c633704e09))
* **cicd:** install Datadog agent on container ([c299c00](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/c299c002ada330f315a025ec41a6ed87a47fcc32))
* **cicd:** use siigo nodejs images ([840d70d](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/840d70d337d8d69a5209183afe344c70991abd72))
* **node:** change dockerfile to compile node app ([e7b251c](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/e7b251cd9d5c0231f4388d845f47a795814025c0))
* **node:** replace TSLint with ESLint ([dbb6e6d](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/dbb6e6d94dfb72589c1399b2fcb07b8d26fa535e))
* **node:** update Husky ([fee05b2](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/fee05b208316f1478e6f1af58569aeaef7559d25))
* updating internal libraries ([3dc8e1c](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/3dc8e1c429be92631fd98a84944b7c4bca7249de))
* updating libs & fixing missing placeholder ([762d4a3](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/762d4a3ed9a43426795ff912e1dfaa1b1188fdd9))


### Bug Fixes

* :zap: update reponse logcontroller and routes of swagger ([2479dd6](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/2479dd6813148d95a0bf4be0b0e21286486da99b))
* change to [@siigo](https://dev.azure.com/siigo):core ([927380d](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/927380d3c202121c3e9082f209713f62ab7a3b97))
* **dotnet:** remove test for .editorconfig file ([c08443a](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/c08443ad38284b9802000cfc946be0f1ea0b6766))
* error in env files, removing extra editconfig ([2c55c11](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/2c55c1191e08b0635b7d9d2f10929cf91051531c))
* **node:** use @siigo/core-security for new nest modules ([63fd51a](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/63fd51a888f8d52949be86240fbbf6a7c2e6c911))
* remove dotnet version of Datadog tracer ([9f54e32](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/9f54e320c76271498990d5f4df6cd74e91cd190b))


### Performance Improvements

* reduce default replica count ([4f03039](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/4f03039a721fb6b24ddf1d80b158ee9a73ac8401))


### Build System

* **golang:** use siigo images for golang dockerfile ([ef6cea1](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/ef6cea123d902b0426313d67eeda7d0fd8543011))


### Tests

* add more rules to ESLint ([12d6a26](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/12d6a26c7f377d5786bb50ed53f5da0ccd772a64))
* **cicd:** mock devops projects ([3f3c72b](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/3f3c72bcc23266eb65a1c6965f59ba8522c57aec))
* **core:** mock siigo file update ([a8c7fad](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/a8c7fad4f3c58e26277d2cb83e212b1ebefb02ef))
* **dotnet:** increase coverage in comand+query template ([edae70c](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/edae70c3ea5c3371c24882c43f7dafde0e24230e))
* **dotnet:** increase coverage in command template ([ccb65d8](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/ccb65d859fd364cbf3c210e4e1b68a2146ff99cf))
* **dotnet:** increase coverage in query template ([0f3e94a](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/0f3e94ab05b12689f3f795df9cdb3df48c8d4bcd))


### CI

* configure sonar script ([3c940c7](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/3c940c72ee134b20e65880813d25eddcc8b9042e))
* use Siigo node library pipeline ([749295f](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/749295f951212f014f62c22a923fe8c5e313ecc8))


### Code Refactoring

* :dizzy: custumize open-api ([459fc9f](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/459fc9f4a40787d7d1ce81a6155fe7d2c33aeb0d))
* :recycle: update test mocha ([ae18b6d](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/ae18b6d87e9e4ce2659918e6ed079d727b536100))
* **cicd:** move out chart functions ([53343dd](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/53343dd11beb29629568d5a525c0b01c597ead0d))
* use Lodash for upper first letter ([21cc610](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/21cc610ecdf00961435c4ff6745d4989e35bdb81))


### Others

* **cicd:** update environment yamls ([4f8192b](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/4f8192bb805212a6e77d211dac4ba1f870da622f))
* **golang:** update validation token module ([046f498](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/046f498f121b773bc7eb26eceaecf28177f5fb93))
* reduce update interval and change release config file ([fcf5481](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/fcf5481e89a03e6196865a01d35a57a7d6399002))
* **release:** 2.4.0 ([730fc8f](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/730fc8fca89fdd5b7fabf70ac50489786ecb18f0))
* remove unused packages ([79e44d8](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/79e44d89d514adb99ca38735e03dfe321c13e361))
* remove vscode folder ([284c39b](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/284c39bf3fbdf702f1b9b03b067ac376c95c9b8e))

## [2.4.0](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/compare/v2.3.0...v2.4.0) (2021-09-16)


### Features

* **cicd:** install Datadog agent on container ([c299c00](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/c299c002ada330f315a025ec41a6ed87a47fcc32))
* **cicd:** use siigo nodejs images ([840d70d](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/840d70d337d8d69a5209183afe344c70991abd72))
* **node:** change dockerfile to compile node app ([e7b251c](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/e7b251cd9d5c0231f4388d845f47a795814025c0))
* updating internal libraries ([3dc8e1c](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/3dc8e1c429be92631fd98a84944b7c4bca7249de))
* updating libs & fixing missing placeholder ([762d4a3](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/762d4a3ed9a43426795ff912e1dfaa1b1188fdd9))


### Bug Fixes

* change to [@siigo](https://dev.azure.com/siigo):core ([927380d](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/927380d3c202121c3e9082f209713f62ab7a3b97))
* **node:** use @siigo/core-security for new nest modules ([63fd51a](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/63fd51a888f8d52949be86240fbbf6a7c2e6c911))
* remove dotnet version of Datadog tracer ([9f54e32](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/9f54e320c76271498990d5f4df6cd74e91cd190b))


### Tests

* add more rules to ESLint ([12d6a26](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/12d6a26c7f377d5786bb50ed53f5da0ccd772a64))
* **dotnet:** increase coverage in comand+query template ([edae70c](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/edae70c3ea5c3371c24882c43f7dafde0e24230e))
* **dotnet:** increase coverage in command template ([ccb65d8](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/ccb65d859fd364cbf3c210e4e1b68a2146ff99cf))
* **dotnet:** increase coverage in query template ([0f3e94a](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/0f3e94ab05b12689f3f795df9cdb3df48c8d4bcd))


### Others

* reduce update interval and change release config file ([fcf5481](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/fcf5481e89a03e6196865a01d35a57a7d6399002))
* remove vscode folder ([284c39b](https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Cli/commit/284c39bf3fbdf702f1b9b03b067ac376c95c9b8e))

## [2.3.0](https://dev.azure.com///compare/v2.0.5...v2.3.0) (2021-08-10)


### Features

* **test.ak6:** add a gRPC example load test ([188e55c](https://dev.azure.com///commit/188e55c7ba385dc2e30dc3f920f4d75105eef131))
* :art: add edit group and fixed bug project name goland ([7f143c4](https://dev.azure.com///commit/7f143c4064ecda4caffb435b0c7e3963b6f21365))
* :art: add feature nvm soport ([3107bbc](https://dev.azure.com///commit/3107bbcfd90e1032ce8fe683ff5c27288780d4cf))
* :art: add valitation nvm ([7400535](https://dev.azure.com///commit/74005358a27046e32225120833531bf9ef6d0f03))
* :art: manejo de excepciones y eliminacion de tags cicid ([30fc2a3](https://dev.azure.com///commit/30fc2a3ad2e87b4654d4db19c3b3dd7090b120c8))
* :art: use last version ([17c14ae](https://dev.azure.com///commit/17c14ae0ac0661bed27b52f91d5e228dfee01252))
* :zap: manejo de excepciones ([97099ad](https://dev.azure.com///commit/97099ad611479adb3fbd64611ad9c5c62ce2efbb))
* :zap: manejo de excepciones y eliminacion de tags ([09e735b](https://dev.azure.com///commit/09e735ba846c1652bb753865aaa2f1e17dff7d40))
* **bolt:** set log format on golang archetype ([f99250d](https://dev.azure.com///commit/f99250dc86b5c732d023831d190a0bb7a401a8ac))
* **core:** add style checking using .editorconfig file ([78feec1](https://dev.azure.com///commit/78feec103ca8c45850522857e4968b44657d8aa5))
* **core:** use siigo.core.security library ([28002c9](https://dev.azure.com///commit/28002c971e106602211b0441edc26c014e6ad017))
* **dotnet:** add test for health check endpoint ([dcde4f9](https://dev.azure.com///commit/dcde4f9b072590a439bf5a6b639abd35d215c1b7))
* :zap: obtiene la ultima version del chart ([3366ff1](https://dev.azure.com///commit/3366ff1a6f666320e9fe25de226fd72bc24dd905))
* :zap: se valida si ya exite el respositorio ([21f41a7](https://dev.azure.com///commit/21f41a7a84887bbf6031236ba0ecb463b6a96dce))
* :zap: update instalation file ps1 ([c60809d](https://dev.azure.com///commit/c60809de307ec16b155da641914b42b1f851600a))
* :zap: update install windows ([5b89e10](https://dev.azure.com///commit/5b89e10b75d3678f66f66cca56825f6d0c3fbd18))
* :zap: update installation file in unix ([8f25bb5](https://dev.azure.com///commit/8f25bb5d0002ac99a753edf9b6ec047cf71c6c11))
* add the ak6 generator for testing projects ([71df541](https://dev.azure.com///commit/71df5417e81d20a6acc7953c29128c88acc47326))
* **dotnet:** extend from microservice generator ([64eb2ef](https://dev.azure.com///commit/64eb2ef6e3c9b44c316bb27259267e7568e09a2c))
* Adding datadog trace injections ([be4ffeb](https://dev.azure.com///commit/be4ffebb9db780ebfbaf84e3cee427df69a4f8b5))
* ask for project prefix if not defined ([1bcffc3](https://dev.azure.com///commit/1bcffc3a06eb143e51f082253e8eb708e01edb34))
* bump Yeoman version to 5 ([5d5c8ec](https://dev.azure.com///commit/5d5c8ecb8d62988786b0e5b56ec4303e7685dbbe))
* Se actualizan los generadores de .Net para recibir un prefijo ([34e5cb3](https://dev.azure.com///commit/34e5cb30e246e29f29530ac239a86432a1c08c71))
* show available updates for generator-siigo ([084445a](https://dev.azure.com///commit/084445adb4958a093dc0375507adc33047db5dd1))
* Updating dockerfile, chart and envs ([863df33](https://dev.azure.com///commit/863df330f5c5eb9346db927571a352a70b203cf0))
* **env:** add env to work with security context ([2c14815](https://dev.azure.com///commit/2c14815a7888c2a1c33e1481b4044fc2f361b929))
* **netcore:** create a checksum file ([80372fb](https://dev.azure.com///commit/80372fbe82709354b691f21666757171cdce8358))
* **package:** version 2.0.1 ([601c1f9](https://dev.azure.com///commit/601c1f9ea1aca7b79c69e50aa102401592239d1b))
* **scripts:** add bash installers ([822ca6a](https://dev.azure.com///commit/822ca6af4e7bddf57523607857ea4a1ff1759b05))


### Bug Fixes

* **dotnet:** use project prefix and name ([20cf103](https://dev.azure.com///commit/20cf1035d8f11e441ec74d0ffe132aceb1b7346f))
* **node:** use the new @siigo/core-security library ([2bbe68a](https://dev.azure.com///commit/2bbe68a23216e8537b1690acf5ab78f89bcd1785))
* :art: update project-name core node ([cc81bb5](https://dev.azure.com///commit/cc81bb545caf12e6057d161c1a9559790e75d387))
* increase update check interval ([e38423e](https://dev.azure.com///commit/e38423e1d7be29d1e58e07ea5df85fe464e47511))
* update name ([756cd00](https://dev.azure.com///commit/756cd008f38b8a96fe44b38365f72d5bd9f18eca))
* **cicd:** add missing file and change prompting location ([a496569](https://dev.azure.com///commit/a4965699c755726b08ba67406901bf43a397f975))
* **node:** set ModuleGenerator as default export and update package-lock.json ([58ece2b](https://dev.azure.com///commit/58ece2b0db1f663db4f2ff8a53c25aa15c0bd7a0))
* :bug: solved project name uppercase ([bed488b](https://dev.azure.com///commit/bed488bbbce8edeb7ee42e3a54107e722a693e22))
* **dotnet:** move test to Tests folder ([7d9fd86](https://dev.azure.com///commit/7d9fd866bb7d7d26c7824d10e7f3c58f7ac6e021))
* :art: nvm linux install ([df7cf75](https://dev.azure.com///commit/df7cf75f51dd32b763716c3b148c78543094a987))
* :bug: bugfix value.yaml ([3e2e5cf](https://dev.azure.com///commit/3e2e5cf17bc73fbaea02777f5de1071813248b2f))
* **cicd:** modify the filepath using CopyOptions instead of gulp rename ([50618a7](https://dev.azure.com///commit/50618a701b8d9f6b6a9ba8d1a31a6d3985082c1c))
* :bug: bugfix by bold and feature cicd ([b8adf48](https://dev.azure.com///commit/b8adf489714dcb58d03747e568e2f57153b26e0a))
* :bug: repair bugfix go in windows ([085fbfb](https://dev.azure.com///commit/085fbfb72a2b069fc387225a205db72e51ba719c))
* :bug: solved bugfix by merge ([95896ad](https://dev.azure.com///commit/95896ad4d1800a1b9be387648f15d5d537834988))
* add archetype-node registry ([7152d49](https://dev.azure.com///commit/7152d49c749448343fdebf4f3941cbc84f1cfc38))
* add Dockefile content for net core 5 type ([2bbbce3](https://dev.azure.com///commit/2bbbce383437b36a4b0d628be22093ad805c03b2))
* add Dockerfile content for net core 5 ([7c0eaf2](https://dev.azure.com///commit/7c0eaf2d26116230c7efa42a88d77f75fd665841))
* add missing tribu tags ([587c5a9](https://dev.azure.com///commit/587c5a9d874c843aa92cb14fa2139c53a44555d9))
* add support for old .net core 3 libraries ([3d48822](https://dev.azure.com///commit/3d4882264c848195ee8fcb577f23927438eb6a83))
* always check for important updates ([d4a73a9](https://dev.azure.com///commit/d4a73a912ee6ce6bb4c619c18d79e0cccd5935f8))
* ESLint problems ([0b49d7e](https://dev.azure.com///commit/0b49d7e65aea7b277c30b8daa035cecab4fa3c20))
* load install actions ([39a420c](https://dev.azure.com///commit/39a420ce9f12882a0edef2e459791e512b1a143e))
* prevent gitignore renaming to npmignore ([f4a8999](https://dev.azure.com///commit/f4a899903d9c7a7b874ed6dc6c1558dfc5ceae22))
* update instead of replace gitconfig file ([01396a6](https://dev.azure.com///commit/01396a6262ddf42f08be236c93c8dcc1313d29c4))
* wait for token on install script ([52a269f](https://dev.azure.com///commit/52a269fa6e8091f0e49cdbdca707832eb5dd0a3c))
* **cicd:** use TypeScript imports ([4d8abc7](https://dev.azure.com///commit/4d8abc70a9f7a642473550cf8fe380e2a53395f1))
* golan archetype test in TypeScript ([aadc67a](https://dev.azure.com///commit/aadc67ade64094ed79574000491b32d213245290))
* save config in user home folder ([cf90aae](https://dev.azure.com///commit/cf90aae191f7e2c9160c9cc0a69090ebe507c835))
* use token from siigo file ([c520e6f](https://dev.azure.com///commit/c520e6fa70dc52ba11be5d234de41c6e929906d9))
* **config:** remove windows only copy of file .siigo ([5682783](https://dev.azure.com///commit/5682783117c68fa7055beb26bbe7778a85041d2a))
* update NestJs cli version ([25720b2](https://dev.azure.com///commit/25720b2fa230696bdcff101b2493c7cebb3426ef))
* **core:** install Tracer on a debian based image ([b222bd5](https://dev.azure.com///commit/b222bd5d58c2def78bd30a2e8ff70a36534b1d25))
* **core:** sort directives ([31fcea2](https://dev.azure.com///commit/31fcea2436b47f867a9969c092238693d80536ae))
* add archetype-node registry ([d49774e](https://dev.azure.com///commit/d49774e13e6a56ae02bfaf73fe58f6cdc2123e34))
* update npmrc token ([e69aee6](https://dev.azure.com///commit/e69aee6c04803258eef993ff0ef014d0b46ba35a))
* update registry token ([3b0cde3](https://dev.azure.com///commit/3b0cde31311e7331b0a03c6134da1f77f7371cc9))
* use variable on entrypoint for net5 ([08c761a](https://dev.azure.com///commit/08c761ab3ee5eba7ffee75de92f3e143d45a5dc3))
* **cmd:** remove commands to remove folders ([b143656](https://dev.azure.com///commit/b143656761748ba43c481692a17ffc737ab6e718))
* **files:** remove dot files ([6819a62](https://dev.azure.com///commit/6819a622742cceeb11ab4e77e3934dbb8f06ce26))


### Docs

* add table of contents to README.md ([c8ccdf7](https://dev.azure.com///commit/c8ccdf709d1954292b0650e08ce2e5a528626da9))
* show all types of changes on CHANGELOG.md ([9c601f6](https://dev.azure.com///commit/9c601f6c845714a3a59826fc6536e1719e8454ad))
* **changelog:** generate changelog ([2dc64b5](https://dev.azure.com///commit/2dc64b509e4d2a3ee8c473faea483419aa321fe0))
* **changelog:** generate changelog ([ec67011](https://dev.azure.com///commit/ec6701182b1cc6c0c390167f42c78a9f19525250))
* **changelog:** generate file with changes ([562b19f](https://dev.azure.com///commit/562b19fcd9e2075a3d211bc324af69955df7b67f))
* **readme:** add links ([b7e402b](https://dev.azure.com///commit/b7e402bf99b90699f21df62f17203547af994a3b))
* **readme:** add url to helm pipelines ([ad9eef0](https://dev.azure.com///commit/ad9eef0328aaf01ca3883fbdb04d8c36ff227a80))
* **readme:** change title from generators to docs ([2a7964a](https://dev.azure.com///commit/2a7964a5fa24a29d8dbce06d949934d8177d078e))
* **readme:** rename command example ([61399a9](https://dev.azure.com///commit/61399a91396f15b508415478b2267e479190a291))
* **readme:** rename link generator ([ca54897](https://dev.azure.com///commit/ca54897ecd243994bf871d939284d8b6447d5d70))


### Styling

* force indentation to 4 spaces ([296eb7f](https://dev.azure.com///commit/296eb7f913e581aab3b53f1ab3cab78d83832352))


### CI

* add npm tag based on branch ([ba3cb0d](https://dev.azure.com///commit/ba3cb0d1d49d07ae4b6c07211aae6bec41f377d0))
* add sonar file with exclusions ([e523224](https://dev.azure.com///commit/e52322471f22fe921c91fcd23f10cf98868d5b56))
* configure lint task on pre-commit hook ([ab0aacb](https://dev.azure.com///commit/ab0aacb98e59411debfd0e9e516b127883e82478))
* regenerate package-lock.json ([80b0c76](https://dev.azure.com///commit/80b0c76b52cb2b6f5892c63d49814eedccfdd5e4))
* set up CI with Azure Pipelines ([b6c051c](https://dev.azure.com///commit/b6c051c261145f173c11b98b5c678870e4d9b704))


### Others

* **release:** 2.2.0 ([39cbe04](https://dev.azure.com///commit/39cbe0459e5913b6f51fc01fbb3daf651e61c26b))
* Adding missing labels ([6476f2b](https://dev.azure.com///commit/6476f2bed2b6bfdfa4660cc87269e551d37ea4c0))


### Build System

* add nodemon for development ([bfdff89](https://dev.azure.com///commit/bfdff896f988f883c5f4acad678bd0d2197926cb))
* watch all extensions with nodemon ([b64d0d4](https://dev.azure.com///commit/b64d0d44403eb5d2c5381604c47d58d89028ed1e))
* **core:** enforce code style in build ([81f56f7](https://dev.azure.com///commit/81f56f7be6f49993ceb59b03a3ecf0c32e3f3565))


### Code Refactoring

* :art: ([31056bc](https://dev.azure.com///commit/31056bceb3ad3f96e9857b7e7baddb2c423865de))
* :art: refactor of source ([2a819d9](https://dev.azure.com///commit/2a819d9fd37bf1024895fe2b60d5134c265fbd20))
* :art: when the command is run in win but it's use by other console ([8577c6b](https://dev.azure.com///commit/8577c6b1b67f7e26eff33b4bf008a326f178d76a))
* :bug: update files conflicts by merge ([8340d7a](https://dev.azure.com///commit/8340d7abfcc625679ae682bb903a39d607f9b8a0))
* :fire: remove pipelines files ([b288385](https://dev.azure.com///commit/b288385c420154593b87477176b3790d7006b7a2))
* :fire: update format ts ([5765856](https://dev.azure.com///commit/5765856c2fa5d0f4c692d52ce980aad3977282c1))
* :zap: refactor all siigo:config ([e917021](https://dev.azure.com///commit/e917021a985650f419d82b7c1ea3748cdf09234a))
* :zap: refactor code ([860ac95](https://dev.azure.com///commit/860ac95934a7a01d715569c6c381c4f9b8a8f908))
* :zap: update default value list project ([aa8e536](https://dev.azure.com///commit/aa8e5362fea1239a258706a3fb89427f5416f2e9))
* create a base generator ([2819bfa](https://dev.azure.com///commit/2819bfa95262811065d5fab19680ba41b95dc941))
* migrate to TypeScript ([8ed5b06](https://dev.azure.com///commit/8ed5b06efec990bc2d14770c644056733f0d937c))
* move sources to src folder ([7f42210](https://dev.azure.com///commit/7f42210a247133e51f192ba0af525b5a2e950bb4))
* rename mocha config file ([49a35d6](https://dev.azure.com///commit/49a35d6544e8c6b252e4aa4dfde66374b670e6b9))
* **core:** move checksum functionality to utils ([5542b3b](https://dev.azure.com///commit/5542b3bb8e0e89618ccc67c727390f37e6c83ad5))
* **url:** change resources urls ([af6af88](https://dev.azure.com///commit/af6af8812a6f9c353fea9065964a19e93a3a0279))


### Tests

* test for default microservice name ([5f6573f](https://dev.azure.com///commit/5f6573fe5c9ced8b6d68b3a142602f8c319d7cba))
* **dotnet:** add test for gRPC client mocking the server ([199bdde](https://dev.azure.com///commit/199bdde09448deecc90ef707eb09cd9fa0a984d3))
* :lock: update testo golang ([f82bed5](https://dev.azure.com///commit/f82bed5124f549ca3fe5b27a8debdff24d37a594))
* **cicd:** add test for cicd generator ([e09b1eb](https://dev.azure.com///commit/e09b1ebacd639c6418464d7c2c636d185bd8085d))
* **dotnet:** add test for gRPC server ([8d1f798](https://dev.azure.com///commit/8d1f798a45727abf8a38ff8b2c8fc5d866dc5873))
* add mocha test for golang generator ([0698657](https://dev.azure.com///commit/0698657f50fc6f97145df02f71ea85cf833e1e33))
* enable ESLint with TypeScript support ([4fbaafb](https://dev.azure.com///commit/4fbaafb03590e45e9d0712f5fb019fc8169bc005))
* generate coverage report for SonarQube ([f3e8e24](https://dev.azure.com///commit/f3e8e24e8d92f2a4b5e6b7dbdcd125c60b271beb))
* use typescript-eslint recommended rules ([f1a669c](https://dev.azure.com///commit/f1a669ca84e2d2fdfc5d83e3a5d01342c0b0ffbc))

## [2.2.0](https://dev.azure.com///compare/v2.0.5...v2.2.0) (2021-07-15)


### Features

* :zap: obtiene la ultima version del chart ([3366ff1](https://dev.azure.com///commit/3366ff1a6f666320e9fe25de226fd72bc24dd905))
* :zap: se valida si ya exite el respositorio ([21f41a7](https://dev.azure.com///commit/21f41a7a84887bbf6031236ba0ecb463b6a96dce))
* **bolt:** set log format on golang archetype ([f99250d](https://dev.azure.com///commit/f99250dc86b5c732d023831d190a0bb7a401a8ac))
* **dotnet:** extend from microservice generator ([64eb2ef](https://dev.azure.com///commit/64eb2ef6e3c9b44c316bb27259267e7568e09a2c))
* Adding datadog trace injections ([be4ffeb](https://dev.azure.com///commit/be4ffebb9db780ebfbaf84e3cee427df69a4f8b5))
* ask for project prefix if not defined ([1bcffc3](https://dev.azure.com///commit/1bcffc3a06eb143e51f082253e8eb708e01edb34))
* **core:** use siigo.core.security library ([28002c9](https://dev.azure.com///commit/28002c971e106602211b0441edc26c014e6ad017))
* bump Yeoman version to 5 ([5d5c8ec](https://dev.azure.com///commit/5d5c8ecb8d62988786b0e5b56ec4303e7685dbbe))
* Se actualizan los generadores de .Net para recibir un prefijo ([34e5cb3](https://dev.azure.com///commit/34e5cb30e246e29f29530ac239a86432a1c08c71))
* show available updates for generator-siigo ([084445a](https://dev.azure.com///commit/084445adb4958a093dc0375507adc33047db5dd1))
* **core:** add style checking using .editorconfig file ([78feec1](https://dev.azure.com///commit/78feec103ca8c45850522857e4968b44657d8aa5))
* Updating dockerfile, chart and envs ([863df33](https://dev.azure.com///commit/863df330f5c5eb9346db927571a352a70b203cf0))
* **env:** add env to work with security context ([2c14815](https://dev.azure.com///commit/2c14815a7888c2a1c33e1481b4044fc2f361b929))
* **netcore:** create a checksum file ([80372fb](https://dev.azure.com///commit/80372fbe82709354b691f21666757171cdce8358))
* **package:** version 2.0.1 ([601c1f9](https://dev.azure.com///commit/601c1f9ea1aca7b79c69e50aa102401592239d1b))
* **scripts:** add bash installers ([822ca6a](https://dev.azure.com///commit/822ca6af4e7bddf57523607857ea4a1ff1759b05))


### Bug Fixes

* **cicd:** use TypeScript imports ([4d8abc7](https://dev.azure.com///commit/4d8abc70a9f7a642473550cf8fe380e2a53395f1))
* :bug: bugfix by bold and feature cicd ([b8adf48](https://dev.azure.com///commit/b8adf489714dcb58d03747e568e2f57153b26e0a))
* :bug: repair bugfix go in windows ([085fbfb](https://dev.azure.com///commit/085fbfb72a2b069fc387225a205db72e51ba719c))
* :bug: solved bugfix by merge ([95896ad](https://dev.azure.com///commit/95896ad4d1800a1b9be387648f15d5d537834988))
* add archetype-node registry ([7152d49](https://dev.azure.com///commit/7152d49c749448343fdebf4f3941cbc84f1cfc38))
* add archetype-node registry ([d49774e](https://dev.azure.com///commit/d49774e13e6a56ae02bfaf73fe58f6cdc2123e34))
* add Dockefile content for net core 5 type ([2bbbce3](https://dev.azure.com///commit/2bbbce383437b36a4b0d628be22093ad805c03b2))
* add Dockerfile content for net core 5 ([7c0eaf2](https://dev.azure.com///commit/7c0eaf2d26116230c7efa42a88d77f75fd665841))
* add support for old .net core 3 libraries ([3d48822](https://dev.azure.com///commit/3d4882264c848195ee8fcb577f23927438eb6a83))
* always check for important updates ([d4a73a9](https://dev.azure.com///commit/d4a73a912ee6ce6bb4c619c18d79e0cccd5935f8))
* ESLint problems ([0b49d7e](https://dev.azure.com///commit/0b49d7e65aea7b277c30b8daa035cecab4fa3c20))
* golan archetype test in TypeScript ([aadc67a](https://dev.azure.com///commit/aadc67ade64094ed79574000491b32d213245290))
* load install actions ([39a420c](https://dev.azure.com///commit/39a420ce9f12882a0edef2e459791e512b1a143e))
* use token from siigo file ([c520e6f](https://dev.azure.com///commit/c520e6fa70dc52ba11be5d234de41c6e929906d9))
* **cicd:** add missing file and change prompting location ([a496569](https://dev.azure.com///commit/a4965699c755726b08ba67406901bf43a397f975))
* **config:** remove windows only copy of file .siigo ([5682783](https://dev.azure.com///commit/5682783117c68fa7055beb26bbe7778a85041d2a))
* prevent gitignore renaming to npmignore ([f4a8999](https://dev.azure.com///commit/f4a899903d9c7a7b874ed6dc6c1558dfc5ceae22))
* save config in user home folder ([cf90aae](https://dev.azure.com///commit/cf90aae191f7e2c9160c9cc0a69090ebe507c835))
* update instead of replace gitconfig file ([01396a6](https://dev.azure.com///commit/01396a6262ddf42f08be236c93c8dcc1313d29c4))
* update NestJs cli version ([25720b2](https://dev.azure.com///commit/25720b2fa230696bdcff101b2493c7cebb3426ef))
* **cmd:** remove commands to remove folders ([b143656](https://dev.azure.com///commit/b143656761748ba43c481692a17ffc737ab6e718))
* **core:** install Tracer on a debian based image ([b222bd5](https://dev.azure.com///commit/b222bd5d58c2def78bd30a2e8ff70a36534b1d25))
* **core:** sort directives ([31fcea2](https://dev.azure.com///commit/31fcea2436b47f867a9969c092238693d80536ae))
* update npmrc token ([e69aee6](https://dev.azure.com///commit/e69aee6c04803258eef993ff0ef014d0b46ba35a))
* update registry token ([3b0cde3](https://dev.azure.com///commit/3b0cde31311e7331b0a03c6134da1f77f7371cc9))
* use variable on entrypoint for net5 ([08c761a](https://dev.azure.com///commit/08c761ab3ee5eba7ffee75de92f3e143d45a5dc3))
* **files:** remove dot files ([6819a62](https://dev.azure.com///commit/6819a622742cceeb11ab4e77e3934dbb8f06ce26))


### Others

* Adding missing labels ([6476f2b](https://dev.azure.com///commit/6476f2bed2b6bfdfa4660cc87269e551d37ea4c0))


### Docs

* add table of contents to README.md ([c8ccdf7](https://dev.azure.com///commit/c8ccdf709d1954292b0650e08ce2e5a528626da9))
* show all types of changes on CHANGELOG.md ([9c601f6](https://dev.azure.com///commit/9c601f6c845714a3a59826fc6536e1719e8454ad))
* **changelog:** generate changelog ([2dc64b5](https://dev.azure.com///commit/2dc64b509e4d2a3ee8c473faea483419aa321fe0))
* **changelog:** generate changelog ([ec67011](https://dev.azure.com///commit/ec6701182b1cc6c0c390167f42c78a9f19525250))
* **changelog:** generate file with changes ([562b19f](https://dev.azure.com///commit/562b19fcd9e2075a3d211bc324af69955df7b67f))
* **readme:** add links ([b7e402b](https://dev.azure.com///commit/b7e402bf99b90699f21df62f17203547af994a3b))
* **readme:** add url to helm pipelines ([ad9eef0](https://dev.azure.com///commit/ad9eef0328aaf01ca3883fbdb04d8c36ff227a80))
* **readme:** change title from generators to docs ([2a7964a](https://dev.azure.com///commit/2a7964a5fa24a29d8dbce06d949934d8177d078e))
* **readme:** rename command example ([61399a9](https://dev.azure.com///commit/61399a91396f15b508415478b2267e479190a291))
* **readme:** rename link generator ([ca54897](https://dev.azure.com///commit/ca54897ecd243994bf871d939284d8b6447d5d70))


### Styling

* force indentation to 4 spaces ([296eb7f](https://dev.azure.com///commit/296eb7f913e581aab3b53f1ab3cab78d83832352))


### CI

* add npm tag based on branch ([ba3cb0d](https://dev.azure.com///commit/ba3cb0d1d49d07ae4b6c07211aae6bec41f377d0))
* add sonar file with exclusions ([e523224](https://dev.azure.com///commit/e52322471f22fe921c91fcd23f10cf98868d5b56))
* configure lint task on pre-commit hook ([ab0aacb](https://dev.azure.com///commit/ab0aacb98e59411debfd0e9e516b127883e82478))
* regenerate package-lock.json ([80b0c76](https://dev.azure.com///commit/80b0c76b52cb2b6f5892c63d49814eedccfdd5e4))
* set up CI with Azure Pipelines ([b6c051c](https://dev.azure.com///commit/b6c051c261145f173c11b98b5c678870e4d9b704))


### Tests

* add mocha test for golang generator ([0698657](https://dev.azure.com///commit/0698657f50fc6f97145df02f71ea85cf833e1e33))
* enable ESLint with TypeScript support ([4fbaafb](https://dev.azure.com///commit/4fbaafb03590e45e9d0712f5fb019fc8169bc005))
* generate coverage report for SonarQube ([f3e8e24](https://dev.azure.com///commit/f3e8e24e8d92f2a4b5e6b7dbdcd125c60b271beb))


### Build System

* add nodemon for development ([bfdff89](https://dev.azure.com///commit/bfdff896f988f883c5f4acad678bd0d2197926cb))
* **core:** enforce code style in build ([81f56f7](https://dev.azure.com///commit/81f56f7be6f49993ceb59b03a3ecf0c32e3f3565))


### Code Refactoring

* :bug: update files conflicts by merge ([8340d7a](https://dev.azure.com///commit/8340d7abfcc625679ae682bb903a39d607f9b8a0))
* :fire: remove pipelines files ([b288385](https://dev.azure.com///commit/b288385c420154593b87477176b3790d7006b7a2))
* :fire: update format ts ([5765856](https://dev.azure.com///commit/5765856c2fa5d0f4c692d52ce980aad3977282c1))
* create a base generator ([2819bfa](https://dev.azure.com///commit/2819bfa95262811065d5fab19680ba41b95dc941))
* migrate to TypeScript ([8ed5b06](https://dev.azure.com///commit/8ed5b06efec990bc2d14770c644056733f0d937c))
* move sources to src folder ([7f42210](https://dev.azure.com///commit/7f42210a247133e51f192ba0af525b5a2e950bb4))
* rename mocha config file ([49a35d6](https://dev.azure.com///commit/49a35d6544e8c6b252e4aa4dfde66374b670e6b9))
* **core:** move checksum functionality to utils ([5542b3b](https://dev.azure.com///commit/5542b3bb8e0e89618ccc67c727390f37e6c83ad5))
* **url:** change resources urls ([af6af88](https://dev.azure.com///commit/af6af8812a6f9c353fea9065964a19e93a3a0279))

## [2.1.0](https://dev.azure.com///compare/v2.0.5...v2.1.0) (2021-06-09)


### Features

* bump Yeoman version to 5 ([5d5c8ec](https://dev.azure.com///commit/5d5c8ecb8d62988786b0e5b56ec4303e7685dbbe))
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

* **core:** install Tracer on a debian based image ([b222bd5](https://dev.azure.com///commit/b222bd5d58c2def78bd30a2e8ff70a36534b1d25))
* add archetype-node registry ([d49774e](https://dev.azure.com///commit/d49774e13e6a56ae02bfaf73fe58f6cdc2123e34))
* add Dockefile content for net core 5 type ([2bbbce3](https://dev.azure.com///commit/2bbbce383437b36a4b0d628be22093ad805c03b2))
* add Dockerfile content for net core 5 ([7c0eaf2](https://dev.azure.com///commit/7c0eaf2d26116230c7efa42a88d77f75fd665841))
* add support for old .net core 3 libraries ([3d48822](https://dev.azure.com///commit/3d4882264c848195ee8fcb577f23927438eb6a83))
* always check for important updates ([d4a73a9](https://dev.azure.com///commit/d4a73a912ee6ce6bb4c619c18d79e0cccd5935f8))
* ESLint problems ([0b49d7e](https://dev.azure.com///commit/0b49d7e65aea7b277c30b8daa035cecab4fa3c20))
* **core:** sort directives ([31fcea2](https://dev.azure.com///commit/31fcea2436b47f867a9969c092238693d80536ae))
* save config in user home folder ([cf90aae](https://dev.azure.com///commit/cf90aae191f7e2c9160c9cc0a69090ebe507c835))
* update npmrc token ([e69aee6](https://dev.azure.com///commit/e69aee6c04803258eef993ff0ef014d0b46ba35a))
* update registry token ([3b0cde3](https://dev.azure.com///commit/3b0cde31311e7331b0a03c6134da1f77f7371cc9))
* use variable on entrypoint for net5 ([08c761a](https://dev.azure.com///commit/08c761ab3ee5eba7ffee75de92f3e143d45a5dc3))
* **cmd:** remove commands to remove folders ([b143656](https://dev.azure.com///commit/b143656761748ba43c481692a17ffc737ab6e718))
* **files:** remove dot files ([6819a62](https://dev.azure.com///commit/6819a622742cceeb11ab4e77e3934dbb8f06ce26))


### Code Refactoring

* **url:** change resources urls ([af6af88](https://dev.azure.com///commit/af6af8812a6f9c353fea9065964a19e93a3a0279))


### Docs

* add table of contents to README.md ([c8ccdf7](https://dev.azure.com///commit/c8ccdf709d1954292b0650e08ce2e5a528626da9))
* **changelog:** generate changelog ([2dc64b5](https://dev.azure.com///commit/2dc64b509e4d2a3ee8c473faea483419aa321fe0))
* **changelog:** generate changelog ([ec67011](https://dev.azure.com///commit/ec6701182b1cc6c0c390167f42c78a9f19525250))
* **changelog:** generate file with changes ([562b19f](https://dev.azure.com///commit/562b19fcd9e2075a3d211bc324af69955df7b67f))
* **readme:** add links ([b7e402b](https://dev.azure.com///commit/b7e402bf99b90699f21df62f17203547af994a3b))
* **readme:** add url to helm pipelines ([ad9eef0](https://dev.azure.com///commit/ad9eef0328aaf01ca3883fbdb04d8c36ff227a80))
* **readme:** change title from generators to docs ([2a7964a](https://dev.azure.com///commit/2a7964a5fa24a29d8dbce06d949934d8177d078e))
* **readme:** rename command example ([61399a9](https://dev.azure.com///commit/61399a91396f15b508415478b2267e479190a291))
* **readme:** rename link generator ([ca54897](https://dev.azure.com///commit/ca54897ecd243994bf871d939284d8b6447d5d70))


### Others

* Adding missing labels ([6476f2b](https://dev.azure.com///commit/6476f2bed2b6bfdfa4660cc87269e551d37ea4c0))


### CI

* add npm tag based on branch ([ba3cb0d](https://dev.azure.com///commit/ba3cb0d1d49d07ae4b6c07211aae6bec41f377d0))
* configure lint task on pre-commit hook ([ab0aacb](https://dev.azure.com///commit/ab0aacb98e59411debfd0e9e516b127883e82478))
* set up CI with Azure Pipelines ([b6c051c](https://dev.azure.com///commit/b6c051c261145f173c11b98b5c678870e4d9b704))


### Build System

* **core:** enforce code style in build ([81f56f7](https://dev.azure.com///commit/81f56f7be6f49993ceb59b03a3ecf0c32e3f3565))

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
