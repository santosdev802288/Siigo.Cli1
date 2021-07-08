const updateNotifier = require('update-notifier');
import pkg from '../package.json';

export function verifyNewVersion() {
    // Checks for available update and returns an instance
    const notifier = updateNotifier({
        pkg,
        updateCheckInterval: 0 // always
    });

    // Notify using the built-in convenience method
    notifier.notify({isGlobal: true});

    // Stop if a new version is available
    let type = notifier.update != null ? notifier.update.type: undefined;
    if (['major', 'minor'].includes(type)) {
        console.error(`Error. Update to the last version of ${pkg.name}`)
        process.exit(1)
    }
}
