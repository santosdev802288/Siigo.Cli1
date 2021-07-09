import * as crypto from 'crypto';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

function findFiles(directory: any) {
    let fileList: any = [];
    const files = fs.readdirSync(directory);
    files.forEach((file: any) => {
        const fromPath = path.join(directory, file);
        const stat = fs.statSync(fromPath);
        if (stat.isFile()) {
            fileList.push(fromPath);
        }
        else if (stat.isDirectory()) {
            fileList = fileList.concat(findFiles(fromPath));
        }
    });
    return fileList;
}

export function getChecksums(directory: any) {
    const checksums: any = [];
    const fileList = findFiles(directory);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'filepath' implicitly has an 'any' type.
    fileList.forEach(filepath => {
        const hash = (crypto as any).createHash('sha256');
        const input = fs.readFileSync(filepath);
        hash.update(input);
        checksums.push(hash.digest('hex'));
    });
    let content = '';
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
    fileList.forEach((value, index) => {
        content += `${checksums[index]}  ${path.relative(directory, value)}${os.EOL}`;
    });
    return content;
}
