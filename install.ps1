function Get-CheckRequirements {
    param (
        [string[]]$ParameterName
    )

    foreach ($Parameter in $ParameterName) {
        $isrequirementsInstalled = (Get-ItemProperty HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*) + (Get-ItemProperty HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*) | Where-Object { $null -ne $_.DisplayName -and $_.Displayname.Contains($Parameter) }
        # Write-Output $isrequirementsInstalled.VersionMinor
        If(!$isrequirementsInstalled)
        {   
            Write-Output "SiigoSay: Please install <$Parameter> in your computer"
            Exit
        }Else {
            if ($Parameter -eq "Node") {
                $vnode = 12
                if($isrequirementsInstalled.VersionMajor -le $vnode){
                    Write-Output "SiigoSay: NODE must be greater than or equal to $vnode"
                    Exit
                }
            }
            if ($Parameter -eq "Git") {
                $vgit = 2
                $vgitmin = 18
                if($isrequirementsInstalled.VersionMajor -eq $vgit){
                    if($isrequirementsInstalled.VersionMinor -le $vgitmin){
                        Write-Output "SiigoSay: Git must be greater than or equal to $vgit.$vgitmin" 
                        Exit
                    }
                }else {
                    if($isrequirementsInstalled.VersionMajor -le $vgitmin){
                        Write-Output "SiigoSay: Git must be greater than or equal to $vgit.$vgitmin" 
                        Exit
                    }
                }
            }
            
        }
    }
}

Get-CheckRequirements -ParameterName "Node", Git, "Microsoft Azure CLI"

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