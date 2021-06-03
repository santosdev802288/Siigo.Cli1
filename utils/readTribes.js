const jsonfile = require('jsonfile')
/**
 *
 * @param {string} filePath
 * @description Reads a given tribes JSON file and returns an array
 * with information about the name and group of the obtained tribes
 */
const readTribesFile = async (filePath) =>{
    let select_tribes = []
    let info_tribes = await jsonfile.readFile(filePath).catch(error =>{
        console.log("\ntribes.json file not found!!")
    })

    if (typeof info_tribes !== 'undefined' && info_tribes.length > 0) {
        info_tribes.forEach(element => {
            element.tribes.forEach(tribe => {
                tribe.groups.forEach(group => {
                    select_tribes.push(tribe.name + "_" + group.group_name)
                })
            })
        })
    }
    return select_tribes
}

module.exports = readTribesFile
