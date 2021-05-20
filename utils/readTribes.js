const jsonfile = require('jsonfile')

/**
 *
 * @param {string} filePath
 * @return []*
 * @description Reads a given tribes JSON file and returns an array
 * with information about the name and group of the obtained tribes
 */
const readTribesFile = (filePath) =>{
    const select_tribes = []
    jsonfile.readFile(filePath)
        .then(obj => {
            obj.forEach(element =>{
                element.tribes.forEach(tribe => {
                    tribe.groups.forEach(group =>{
                        select_tribes.push(tribe.name+"-"+group.group_name)
                    })
                })
            })
        })
        .catch(error => console.error(error))

    return select_tribes
}

module.exports = readTribesFile
