import fetch from 'node-fetch';


export async function getProjects(token: any) {
    const b64 = Buffer.from(token.trim() + ':').toString('base64');
    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: 'Basic ' + b64,
        },
        redirect: 'follow'
    };
    // @ts-expect-error -migrate(2345) FIXME: Argument of type '{ method: string; headers: { Aut... Remove this comment to see the full error message
    let response = await fetch('https://dev.azure.com/SiigoDevOps/_apis/projects?api-version=6.0', requestOptions);
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'Response'... Remove this comment to see the full error message
    response = await response.text();
    try {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Response' is not assignable to p... Remove this comment to see the full error message
        response = JSON.parse(response);
    }
    catch (err) {
        console.log(('Token no es valido' as any).red);
    }
    const projects = {};
    (response as any).value.forEach((element: any) => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        projects[element.name] = element.id;
    });
    return projects;
}

export async function createRepository(token: any, name: any, idproject: any) {
    const b64 = Buffer.from(token.trim() + ':').toString('base64');
    const myHeaders = new (fetch as any).Headers();
    myHeaders.append('Authorization', 'Basic ' + b64);
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
        'name': name,
        'project': {
            'id': idproject
        }
    });
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ method: string; headers: any; ... Remove this comment to see the full error message
    let response = await fetch('https://dev.azure.com/SiigoDevOps/_apis/git/repositories?api-version=6.0', requestOptions);
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'Response'... Remove this comment to see the full error message
    response = await response.text();
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Response' is not assignable to p... Remove this comment to see the full error message
    response = JSON.parse(response);
    return response;
}
