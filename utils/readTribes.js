const info_tribes = require("../tribes/tribes.json")
/**
 *
 * @param {string} filePath
 * @description Reads a given tribes JSON file and returns an array
 * with information about the name and group of the obtained tribes
 */
const readTribesFile = async () =>{
    let select_tribes = []
    if (info_tribes != null && info_tribes.length > 0) {
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

/**
 *
 * @param {string} userSiigo

 * @description Return tribe by User of siiigo
 * 
 */

const tribeByUser = async (userSiigo) => {
    let tribe = "pendiente"
    let name = userSiigo
    info_tribes.forEach(ele=>{
        ele.tribes.forEach(ele2 =>{
            ele2.groups.forEach(ele3 =>{
                ele3.members.forEach(ele4 => {
                    if(ele4.lead.user == userSiigo ) {
                        tribe = ele2.name
                        name = ele4.lead.name
                    }else {
                        ele4.team.forEach(ele5 => {
                            if(ele5.user == userSiigo) {
                                tribe = ele2.name
                                name = ele5.name
                            }
                        })
                    }
                } )
            })
        })
    })
    return {tribe, name}
}

module.exports = {readTribesFile,tribeByUser}
