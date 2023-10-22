const { S3, PutObjectCommand,ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const config = require("./config.json");

const s3 = new S3(config.awsConfig);

async function uploadFileToS3(bucketName, key, filePath) {
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
}

async function downloadFileFromS3(bucketName, key) {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };

    const { Body } = await s3.send(new GetObjectCommand(params));

    const fileStream = fs.createWriteStream("downloaded-file.png");

    await new Promise((resolve, reject) => {
      Body.pipe(fileStream);
      fileStream.on("close", () => {
        resolve("downloaded-file.png");
      });
      fileStream.on("error", reject);
    });
    
    console.log("Dosya başarıyla indirildi.");
    return "downloaded-file.png";
  } catch (err) {
    console.error("Dosya indirilirken hata oluştu:", err);
    throw err; // Hata tekrar yukarıda yakalansın.
  }
}
async function listFiles() {
    const params = {
      Bucket: config.bucketName,
    };
    try {
      const data = await s3.send(new ListObjectsV2Command(params));
      return data.Contents;
    } catch (err) {
      console.error("Dosya listesi alınamadı:", err);
      return [];
    }
  }

module.exports = {
  uploadFileToS3,
  downloadFileFromS3,
  listFiles
};