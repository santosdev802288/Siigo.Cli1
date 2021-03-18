dotnet publish --output out/
docker build -t acrakssiigo.azurecr.io/<%= config.nameLowerCase %>-migration:$1 -f .docker/Dockerfile .
docker push acrakssiigo.azurecr.io/<%= config.nameLowerCase %>-migration:$1