import fs from "fs";
import path from 'path';
import upgradeFile from "./upgrade";

/**
 *
 * @description Creates a new folder to save the tribes information
 */
const createFile = async (tribePath: any) => {
    fs.mkdir(path.join('./', 'tribes'),() => {
        upgradeFile(tribePath, "tribes", "tribes.json")
    });
}

export default createFile;
