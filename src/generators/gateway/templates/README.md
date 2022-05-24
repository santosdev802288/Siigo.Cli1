# API Gateway <%= config.name %>

API Gateway based on a custom image of KrakenD.

- [API Gateway <%= config.name %>](#api-gateway--configname-)
  - [Create an new endpoint](#create-an-new-endpoint)
  - [Run locally](#run-locally)

## Create an new endpoint

1. Create a new folder for each microservice on the partials folder
2. Create a json file in the microservice folder with all the endpoints.
   1. The endpoint should start with the service name.
   2. The backend host should use have the namespace.
   3. Example

    ```json
    {
        "endpoint": "/<service>/api/v1/Log/ThrowException",
        "output_encoding": "no-op",
        "headers_to_pass": [ "*" ],
        "querystring_params": [ "*" ],
        "method": "GET",
        "backend": [
            {
                "host": [ "http://ms-other.siigo-<%= config.name %>:5000" ],
                "url_pattern": "/api/v1/Log/ThrowException",
                "encoding": "no-op"
            }
        ],
    },
    {
        "endpoint": "/<service>/api/v1/Request/Headers/disabled",
        "output_encoding": "no-op",
        "headers_to_pass": [ "*" ],
        "querystring_params": [ "*" ],
        "method": "POST",
        "extra_config": {
            "siigo/validator": {
                "enabled": false
            }
        },
        "backend": [
            {
            "host": [ "http://ms-other.siigo-<%= config.name %>:5000" ],
            "url_pattern": "/api/v1/Request/Headers",
            "encoding": "no-op"
            }
        ]
    }

    ```

3. Add the endpoints reference to the [krakend.json](./krakend.json) file

    ```json
   "endpoints": [
        ....
        {{ include "ms-logger/logger.json" }},
        {{ include "ms-other/other.json" }}
    ],
    ```

## Run locally

You must have access to <http://ms-springcloud.siigo-configuration:5000/commons/qa> from your machine.

After each change to the configuration run the following commands to start the API gateway.

```bash
# Login to the Siigo container regristry
# az acr login -n siigo

docker build --pull -f ./.docker/Dockerfile -t api-gateway-<%= config.name %> .

docker run -it --rm --name api-gateway-<%= config.name %> --network host api-gateway-<%= config.name %>

```
