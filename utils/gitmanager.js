const fetch = require("node-fetch");

async function getProjects(token){
    const b64 = Buffer.from(token.trim()+":").toString('base64')
    var requestOptions = {
        method: 'GET',
        headers: {
            Authorization: 'Basic '+b64,
        },
        redirect: 'follow'
    };
    let  response  = await fetch("https://dev.azure.com/SiigoDevOps/_apis/projects?api-version=6.0", requestOptions)
    response = await response.text();
    try{
        response = JSON.parse(response);
    }catch(err) {console.log("Token no es valido".red)}
    let projects = {}
    response.value.forEach(element => {
        projects[element.name] = element.id
    });
    return projects;
}

async function createRepository (token, name, idproject){
    const b64 = Buffer.from(token.trim()+":").toString('base64')
    var myHeaders = new fetch.Headers();
    myHeaders.append("Authorization", "Basic "+b64);
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
        "name": name,
        "project": {
            "id": idproject
        }
    });
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    let  response  = await fetch("https://dev.azure.com/SiigoDevOps/_apis/git/repositories?api-version=6.0", requestOptions)
    response = await response.text();
    response = JSON.parse(response);
    return response.remoteUrl;
}

module.exports = { getProjects,createRepository}