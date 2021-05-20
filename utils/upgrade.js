const { BlobServiceClient } = require('@azure/storage-blob');

/**
 *
 * @param {string} filePath
 * @param {string} containerName
 * @param {string} blobName
 * @description Connect to BLOB Storage, get a given file name and save to a specific path
 */
function upgradeFile(filePath, containerName, blobName) {
    //const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const blobServiceClient = BlobServiceClient.fromConnectionString("DefaultEndpointsProtocol=https;AccountName=assetsdoc;AccountKey=CFRwG4Ei/3b32nFLe06VNKaUbxXZl0BstgY8llo7s9m/fOJlTrsYvO/QoB2+S+UXUAMgh5GsOP4LHeAEUjUglA==;EndpointSuffix=core.windows.net");

    blobServiceClient.getContainerClient(containerName).
    getBlockBlobClient(blobName).downloadToFile(filePath.concat(blobName));
}

module.exports = upgradeFile
