const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

function verifyNewVersion() {
    // Checks for available update and returns an instance
    const notifier = updateNotifier({
        pkg,
        updateCheckInterval: 0 // always
    });

    // Notify using the built-in convenience method
    notifier.notify({isGlobal: true});

    // Stop if a new version is available
    if (['latest', 'major', 'minor'].includes(notifier.update?.type) ) {
        throw new Error(`Update to the last version of ${pkg.name}`)
    }
}

module.exports = verifyNewVersion;
