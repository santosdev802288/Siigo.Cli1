import updateNotifier from 'update-notifier';
import fs from 'fs';
import path from 'path';


export function verifyNewVersion(): void {
    // Read package.json. Avoid import, it change the dist folder structure
    const pkgPath = path.join(__dirname, '../../package.json')
    const pkg = JSON.parse(fs.readFileSync(pkgPath).toString())
    
    // Checks for available update and returns an instance
    const notifier = updateNotifier({
        pkg,
        updateCheckInterval: 1000 * 60 // 1 minute
    });

    // Notify using the built-in convenience method
    notifier.notify({isGlobal: true});

    // Stop if a new version is available
    const type = notifier.update?.type
    if (type === 'major' || type === 'minor') {
        console.error(`Error. Update to the last version of ${pkg.name}`)
        process.exit(1)
    }
}
