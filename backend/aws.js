const AWS = require('aws-sdk')
require('dotenv').config()
const fs = require('fs')
const bucketName = process.env.AWS_BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

 
const s3 = new AWS.S3({
 accessKeyId,
 secretAccessKey
})

//uploades a file to s3
const uploadFile = async (file) => {
const fileStream = fs.createReadStream(file.path)

const uploadParams = {
 Bucket: bucketName,
 Body: fileStream,
 Key: file.filename
}

return s3.upload(uploadParams).promise()
}

//get a file from s3

module.exports = {
 uploadFile
}