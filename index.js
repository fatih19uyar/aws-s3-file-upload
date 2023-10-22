const { S3, PutObjectCommand } = require("@aws-sdk/client-s3");
const { Readable } = require("stream");
const fs = require("fs");
const config = require("./config.json")

const s3 = new S3(config.awsConfig);
const uploadFileToS3 = async (bucketName, key, filePath) => {
  try {
    const fileStream = fs.createReadStream(filePath);

    const params = {
      Bucket: bucketName,
      Key: key,
      Body: fileStream,
    };

    await s3.send(new PutObjectCommand(params));

    console.log("Dosya başarıyla yüklendi.");
  } catch (err) {
    console.error("Dosya yüklenirken hata oluştu:", err);
  }
};

// Örnek kullanım
const bucketName = config.bucketName;
const key = "test/adsiz.png";
const filePath = "adsiz.png";

uploadFileToS3(bucketName, key, filePath);
