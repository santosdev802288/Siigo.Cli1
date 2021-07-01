const { BlobServiceClient } = require('@azure/storage-blob');

/**
 *
 * @param {string} filePath
 * @param {string} containerName
 * @param {string} blobName
 * @description Connect to BLOB Storage, get a given file name and save to a specific path
 */
const upgradeFile = async (filePath, containerName, blobName) => {
    let upgraded = true
    try {
        const azureStoreConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        const blobServiceClient = BlobServiceClient.fromConnectionString(azureStoreConnectionString);

        blobServiceClient.getContainerClient(containerName).getBlockBlobClient(blobName).
            downloadToFile(filePath.concat(blobName)).catch(error => {
                console.error(error)
                upgraded = false
            });
    } catch (error) {
        console.log(error)
    }
    
    return upgraded
}

module.exports = upgradeFile
