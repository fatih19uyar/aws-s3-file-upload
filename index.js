const { S3, PutObjectCommand } = require("@aws-sdk/client-s3");
const { Readable } = require("stream");
const fs = require("fs");

const awsConfig = {
  region: "us-east-1",
  credentials: {
    accessKeyId: "YOUR_ACCESS_KEY",
    secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
  },
};

const s3 = new S3(awsConfig);

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
const bucketName = "test";
const key = "test/adsiz.png";
const filePath = "adsiz.png";

uploadFileToS3(bucketName, key, filePath);
