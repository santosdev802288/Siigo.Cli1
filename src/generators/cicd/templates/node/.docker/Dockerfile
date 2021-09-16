#
# Imagen base para Node
# Para acceder a las imágenes siigo localmente ejecutar: "az acr login -n siigo"
#
FROM siigo.azurecr.io/node-build:2 as build

WORKDIR /app

COPY .npmrc .npmrc
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production

# Compilar a binario, ver https://github.com/vercel/pkg
RUN pkg -c package.json -t node14-alpine-x64 --o dist/binary --compress GZip dist/main.js

#
# Imagen de ejecución
#
FROM siigo.azurecr.io/node-runtime:3 as runtime

WORKDIR /app

# Copiar binario construido en la imagén anteior
COPY --from=build /app/binary ./

EXPOSE 5000
CMD ["/app/binary"]
