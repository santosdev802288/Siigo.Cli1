const { BlobServiceClient } = require('@azure/storage-blob');

/**
 *
 * @param {string} filePath
 * @param {string} containerName
 * @param {string} blobName
 * @description Connect to BLOB Storage, get a given file name and save to a specific path
 */
function upgradeFile(filePath, containerName, blobName) {
    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

    blobServiceClient.getContainerClient(containerName).getBlockBlobClient(blobName).
    downloadToFile(filePath.concat(blobName)).catch(error => console.error(error));
}

module.exports = upgradeFile
