const updateNotifier = require('update-notifier');
const pkg = require('../package');

function verifyNewVersion() {
    updateNotifier({pkg}).notify();
}

module.exports = verifyNewVersion;
