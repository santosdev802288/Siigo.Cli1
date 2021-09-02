# Imagen base para Node
# Para acceder a las imágenes siigo localmente logearse en acr: "az acr login -n siigo"
FROM siigo.azurecr.io/node-build as build

WORKDIR /usr/src/app

COPY .npmrc .npmrc
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production

# run node prune
RUN /usr/local/bin/node-prune

#
# Imagen de ejecución
#
FROM siigo.azurecr.io/node-runtime as runtime

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 5000
CMD [ "node", "dist/main.js" ]
