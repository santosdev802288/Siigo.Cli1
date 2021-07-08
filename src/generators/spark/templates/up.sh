dotnet publish --output out/
docker build -t acrakssiigo.azurecr.io/<%= config.nameUpper %>_migration:$1 -f sparkOperator/Dockerfile .
docker push acrakssiigo.azurecr.io/<%= config.nameUpper %>_migration:$1