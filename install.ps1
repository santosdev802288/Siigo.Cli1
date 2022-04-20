$token = Read-Host "Input your token"
$npmrcFile = ".npmrc"
$tokenOutput = node -e "b64=Buffer.from('$token'.trim()).toString('base64');console.log(b64);process.exit();"

Set-Location "~"
If (!(Test-Path $npmrcFile)) {
	New-Item $npmrcFile
}

Add-Content $npmrcFile "registry=https://pkgs.dev.azure.com/SiigoDevOps/Siigo/_packaging/siigo-core/npm/registry/"
Add-Content $npmrcFile "always-auth=true"
Add-Content $npmrcFile "; begin auth token"
Add-Content $npmrcFile "//pkgs.dev.azure.com/SiigoDevOps/Siigo/_packaging/siigo-core/npm/registry/:username=SiigoDevOps"
Add-Content $npmrcFile "//pkgs.dev.azure.com/SiigoDevOps/Siigo/_packaging/siigo-core/npm/registry/:_password=$tokenOutput"
Add-Content $npmrcFile "//pkgs.dev.azure.com/SiigoDevOps/Siigo/_packaging/siigo-core/npm/registry/:email=ignore"
Add-Content $npmrcFile "//pkgs.dev.azure.com/SiigoDevOps/Siigo/_packaging/siigo-core/npm/:username=SiigoDevOps"
Add-Content $npmrcFile "//pkgs.dev.azure.com/SiigoDevOps/Siigo/_packaging/siigo-core/npm/:_password=$tokenOutput"
Add-Content $npmrcFile "//pkgs.dev.azure.com/SiigoDevOps/Siigo/_packaging/siigo-core/npm/:email=ignore"
Add-Content $npmrcFile "; end auth token"

npm install --global yo
npm i -g generator-siigo
yo siigo:config --token $token