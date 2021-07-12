import fs from 'fs';
import path from 'path';

//
const flatten = (lists: any) => lists.reduce((a: any, b: any) => a.concat(b), [])

//
const getDirectories = (srcpath: any) => fs
    .readdirSync(srcpath)
    .map((file: any) => path.join(srcpath, file))
    .filter((path: any) => fs.statSync(path).isDirectory())

//
const getDirectoriesRecursive = (srcpath: any): string[] => [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))]

//
export default getDirectoriesRecursive;
