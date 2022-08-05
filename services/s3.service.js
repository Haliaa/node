   .upload({
        Bucket: configs.AWS_S3_BUCKET,
        Key,
        ContentType: file.mimetype,
        ACL: "public-read",
        Body: file.data
      })
      .promise();
}

const updateFile = async (file, fileURL) => {
  const path = fileURL.split(configs.AWS_S3_BUCKET_URL).pop();

  return BucketConfig
      .putObject({
        Bucket: configs.AWS_S3_BUCKET,
        Key: path,
        ContentType: file.mimetype,
        ACL: "public-read",
        Body: file.data
      })
      .promise();
}

const deleteFile = async (fileURL) => {
  const path = fileURL.split(configs.AWS_S3_BUCKET_URL).pop();

  return BucketConfig
      .deleteObject({
        Bucket: configs.AWS_S3_BUCKET,
        Key: path,
      })
      .promise();
};

module.exports = {
  uploadFile,
  updateFile,
  deleteFile,
}

function _buildFilePath(fileName = '', itemType, itemId) {
