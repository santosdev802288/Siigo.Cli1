
docker exec -it xxxxxxxx  /bin/bash

docker cp netcoreapp3.1/. 8fff752e6ae2:/migration

/spark/bin/spark-submit --class org.apache.spark.deploy.dotnet.DotnetRunner --master local microsoft-spark-2.4.x-0.10.0.jar dotnet Siigo.MsThirdParty.Sync.dll