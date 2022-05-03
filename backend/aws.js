const AWS = require('aws-sdk')
// require('dotenv').config()
const fs = require('fs')
// const path = require ("path")
const multer = require("multer")
const NAME_OF_BUCKET = 'raceer-app-upload'
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY


 
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

//uploades a file to s3



const uploadFile = async (file) => {
  const { originalname, mimetype, buffer } = await file;
  const path = require("path");
  // name of the file in your S3 bucket will be the date in ms plus the extension name
  const Key = new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key,
    Body: buffer,
    ACL: "public-read",
  };
  const result = await s3.upload(uploadParams).promise();

  // save the name of the file in your bucket as the key in your database to retrieve for later
  return result.Location;
};


// const uploadFile = async (file) => {
//  console.log(file)
// const fileStream = fs.createReadStream(file.path)

// const uploadParams = {
//  Bucket: bucketName,
//  Body: fileStream,
//  Key: file.filename
// }

// return s3.upload(uploadParams).promise()
// }

//get a file from s3
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});
const singleMulterUpload = (nameOfKey) => multer({ storage: storage }).single(nameOfKey);


module.exports = {
s3,
uploadFile,
singleMulterUpload
}