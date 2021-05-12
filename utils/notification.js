const updateNotifier = require('update-notifier');
const pkg = require('../package');

module.exports = verifyNewVersion = () => updateNotifier({pkg}).notify();
