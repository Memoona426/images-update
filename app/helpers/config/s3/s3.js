const { s3 } = require("../../../config/s3");
const fs = require('fs')
const aws = require('aws-sdk');

exports.ensureFolderExists = async (bucketName, folderName) => {
    try {
        const params = {
            Bucket: bucketName,
            Key: folderName + '/'
        };

        await s3.putObject(params).promise();
        return true;
    } catch (err) {
        console.error('Error checking or creating folder:', err);
        return false;
    }
}

exports.uploadToS3 = async (file, bucketName, folderName, filename) => {
    try {
        const key = `${filename}`;

        // Check if the file already exists in the bucket
        const existsParams = {
            Bucket: bucketName,
            Key: key,
        };
        const objectInfo = await s3.headObject(existsParams).promise().catch(() => {
            console.log("Image on s3 Not found so it is goona be uploaded")
        });

        // If file exists, construct and return the URL
        if (objectInfo) {
            let Location = s3.getSignedUrl('getObject', existsParams)
            if (!Location) {
                Location = `s3://mybucketimage2222/images/${filename}`
            }
            console.log("File already exists in S3. URL:", Location);
            return { Location, alreadyExists: true };
        }

        // File doesn't exist, proceed with upload
        const uploadParams = {
            Body: file.buffer,
            Bucket: bucketName,
            Key: key,
            ContentType: file.mimetype, // Optional but recommended
        };


        const response = await s3.upload(uploadParams).promise();
        return response;
    } catch (error) {
        console.error("Error in uploadToS3()", error);
        return false;
    }
}

exports.deleteFromS3 = async (bucketName, filename) => {
    const key = `${filename}`;

    try {
        const params = {
            Bucket: bucketName,
            Key: key,
        };

        // Check if object exists
        const objectInfo = await s3.headObject(params).promise().catch(() => {
            console.log("Image on S3 not found, skipping delete.");
            return null;
        });

        if (objectInfo) {
            await s3.deleteObject(params).promise();
            console.log(`Successfully deleted ${key} from ${bucketName}`);
            return true;
        } else {
            console.warn(`File not found: ${key} in bucket: ${bucketName}`);
            return false;
        }
    } catch (error) {
        console.error('Error deleting file from S3:', error);
        return false;
    }
};

