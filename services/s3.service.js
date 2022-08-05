const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const uuid=require('uuid').v4

const {AWS_S3_SECRET_KEY, AWS_S3_ACCESS_KEY, AWS_S3_REGION, AWS_S3_BUCKET} = require('../constants/config')

const BucketConfig = new S3({
    region: AWS_S3_REGION,
    secretAccessKey: AWS_S3_SECRET_KEY,
    accessKeyId: AWS_S3_ACCESS_KEY
})

const uploadFile = async (file, itemType, itemId) => {
    const Key = _buildFilePath(file.name, itemType, itemId)

    return BucketConfig.upload({
        Bucket: AWS_S3_BUCKET,
        Key,
        ACL: 'public-read', //access control list
        Body: file.data
    }) // по дефолту ф-я .upload є колбеком, а треба вже промісифікоману ф-ю, щоб повертало Location (в user.controller)
        .promise() //тому промісифікуємо
}

module.exports = {
    uploadFile
}

function _buildFilePath (fileName, itemType, itemId){
    //pop видаляє останній елемент масиву і повертає його як змінну
    const ext1 = fileName.split('.').pop() //поверне jpg
    const ext2 = path.extname(fileName)    //поверне .jpg

    // return `${itemType}/${itemId}/${name}.${ext1}`
    // return `${itemType}/${itemId}/${name}${ext2}`
    // return `${itemType}/${itemId}/${Date.now()}.${ext1}`
    return `${itemType}/${itemId}/${uuid()}.${ext1}`
}
