const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

function verifyNewVersion() {
    // Checks for available update and returns an instance
    const notifier = updateNotifier({
        pkg,
        updateCheckInterval: 1000 * 60 * 60 * 24 * 7 // 1 week
    });

    // Notify using the built-in convenience method
    notifier.notify({isGlobal: true});

    // Stop if a major version is available
    if (notifier.update?.type === 'major') {
        throw new Error(`Update to the last version of ${pkg.name}`)
    }
}

module.exports = verifyNewVersion;
