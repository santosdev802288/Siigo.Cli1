import info_tribes from '../tribes/tribes.json'


/**
 *
 * @description Reads a given tribes JSON file and returns an array
 * with information about the name and group of the obtained tribes
 */
export const readTribesFile = async () =>{
    const select_tribes: any = []
    if (info_tribes != null && info_tribes.length > 0) {
        info_tribes.forEach((element: any) => {
            element.tribes.forEach((tribe: any) => {
                tribe.groups.forEach((group: any) => {
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
export const tribeByUser = async (userSiigo: any) => {
    let tribe = "pendiente"
    let name = userSiigo
    info_tribes.forEach((ele: any) => {
        ele.tribes.forEach((ele2: any) => {
            ele2.groups.forEach((ele3: any) => {
                ele3.members.forEach((ele4: any) => {
                    if(ele4.lead.user == userSiigo ) {
                        tribe = ele2.name
                        name = ele4.lead.name
                    }else {
                        ele4.team.forEach((ele5: any) => {
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
