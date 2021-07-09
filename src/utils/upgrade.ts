const { BlobServiceClient } = require('@azure/storage-blob');

/**
 *
 * @param {string} filePath
 * @param {string} containerName
 * @param {string} blobName
 * @description Connect to BLOB Storage, get a given file name and save to a specific path
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'upgradeFil... Remove this comment to see the full error message
const upgradeFile = async (filePath: any, containerName: any, blobName: any) => {
    let upgraded = true
    try {
        const azureStoreConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        const blobServiceClient = BlobServiceClient.fromConnectionString(azureStoreConnectionString);

        blobServiceClient.getContainerClient(containerName).getBlockBlobClient(blobName).
            downloadToFile(filePath.concat(blobName)).catch((error: any) => {
                console.error(error)
                upgraded = false
            });
    } catch (error) {
        console.log(error)
    }
    
    return upgraded
}

module.exports = upgradeFile
