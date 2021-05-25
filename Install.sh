#!/bin/bash

if [ "x${TOKEN}" = "x" ] ; then
  printf "Unable to get personal access token. Set TOKEN env var and re-run. For example: export TOKEN=jtj4aa5b55oh3ahsj7rgpfage53ut2g7rs6msgedw4ekmy5mdtpq"
  exit 1;
fi

tokenOutput=$(node -e "b64=Buffer.from('$TOKEN'.trim()).toString('base64');console.log(b64);process.exit();")

cd "$HOME" || exit

{
  echo "registry=https://pkgs.dev.azure.com/SiigoDevOps/Siigo/_packaging/siigo-core/npm/registry/ "
  echo "always-auth=true"
  echo "; begin auth token"
  echo "//pkgs.dev.azure.com/SiigoDevOps/Siigo/_packaging/siigo-core/npm/registry/:username=SiigoDevOps"
  echo "//pkgs.dev.azure.com/SiigoDevOps/Siigo/_packaging/siigo-core/npm/registry/:_password=$tokenOutput"
  echo "//pkgs.dev.azure.com/SiigoDevOps/Siigo/_packaging/siigo-core/npm/registry/:email=ignore"
  echo "//pkgs.dev.azure.com/SiigoDevOps/Siigo/_packaging/siigo-core/npm/:username=SiigoDevOps"
  echo "//pkgs.dev.azure.com/SiigoDevOps/Siigo/_packaging/siigo-core/npm/:_password=$tokenOutput"
  echo "//pkgs.dev.azure.com/SiigoDevOps/Siigo/_packaging/siigo-core/npm/:email=ignore"
  echo "; end auth token"
} >> "$HOME"/.npmrc

npm install --global yo
npm i -g generator-siigo
