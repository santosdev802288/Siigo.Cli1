#!/bin/bash
if ! [ -x "$(command -v node)" ] ; then
    echo "Please install <node> in your computer"
    exit
else
    requiredver="12"
    if [ "$(node -v | egrep -o '[0-9]{1,}' | head -1)" -le "$requiredver" ]; then 
        echo "SiigoSay: NODE must be greater than or equal to ${requiredver}"
        exit
    fi
fi

if ! [ -x "$(command -v git)" ] ; then
    echo "SiigoSay: Please install <git> in your computer"
    exit
else
    rvg="2"
    if [ "$(git --version | egrep -o '[0-9]{1,}' | head -1)" = "$rvg" ]; then
        rvgt="18"
        if [ "$(git --version | egrep -o '[0-9]{1,}' | sed -n 2p)" -le "$rvgt" ]; then 
            echo "SiigoSay: GIT must be greater than or equal to 2.18"
            exit
        fi
    else
        if [ "$(git --version | egrep -o '[0-9]{1,}' | head -1)" -lt "$rvg" ]; then
            echo "SiigoSay: GIT must be greater than or equal to 2.18"
            exit
        fi
    fi
fi

if ! [ -x "$(command -v az)" ] ; then
    echo "SiigoSay: Please install <az cli> in your computer"
    exit
fi

echo "Typing your personal token: "
read TOKEN < /dev/tty

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

echo "The installation process may be late, please wait ..."

echo "Install Yeoman"
npm list -g yo@^4.0.0 || npm install --global yo@^4.0.0

echo "Install Siigo generator"
npm i -g generator-siigo
yo siigo:config --token $TOKEN