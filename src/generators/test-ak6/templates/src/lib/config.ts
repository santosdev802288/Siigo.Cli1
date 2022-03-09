
export function buildConfig(env: string){

    console.debug(`Started env: ${env}`)

    const jsonConfig = require(`../config/config.json`)

    if (!jsonConfig[env]) {
        throw new Error(`environment not found. Try add -e ENV={qa | preprod} in your k6 arguments script`)
    }

    return jsonConfig[env]
}
