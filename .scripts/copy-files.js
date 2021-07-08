const shell = require('shelljs');
const pkg = require('../package.json');

// The path to the directory to copy the file(s) to.
const DEST_DIR = './dist';

// NOTE: `customField` below should be replaced with the
// actual key name in the final `package.json`.
const srcFilePaths = pkg.publishFiles;

// Create a new destination directory and intermediate
// directories if necessary.
if (!shell.test('-d', DEST_DIR)) {
  shell.mkdir('-p', DEST_DIR);
}

// Recursively copy each file listed in the `customField` Array.
// Logs and error if the file listed cannot be found.
srcFilePaths.forEach(function (srcPath) {
  if (!shell.test('-e', srcPath)) {
    shell.echo('Error: Cannot find file listed in package.json: %s', srcPath);
    process.exit(1);
  }
  shell.cp('-R', srcPath, DEST_DIR);
});