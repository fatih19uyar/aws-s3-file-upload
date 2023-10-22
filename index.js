const express = require("express");
const app = express();
const port = 8080;
const { uploadFileToS3, downloadFileFromS3 ,listFiles} = require("./aws_s3_utils");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); 
const config = require("./config.json");
const cors = require('cors');
const fs = require("fs");

const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
}

app.use(express.json());
app.use(cors(corsOptions));


app.get("/", (req, res) => {
  res.send("Merhaba, S3 Dosya Yükleme ve İndirme Uygulaması!");
});

app.get("/list", (req, res) => {
  listFiles(config.bucketName)
    .then((files) => {
      console.log("list ok");
      res.status(200).json(files);
    })
    .catch((error) => {
      res.status(500).json({ error: "Dosyalar listelenirken hata oluştu." });
    });
});

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Dosya yüklenemedi." });
  }

  // Yüklemek istediğiniz dosyanın adını S3'de saklamak için kullanabilirsiniz.
  const key = config.key + req.file.originalname;

  // Yükleme işlemini çağırın
  uploadFileToS3(config.bucketName, key, req.file.path)
    .then(() => {
      res.status(200).json({ message: "Dosya başarıyla yüklendi." });
    })
    .catch((error) => {
      res.status(500).json({ error: "Dosya yüklenirken hata oluştu." });
    });
});
app.get("/download", (req, res) => {
  const fileName = req.query.fileName;

  if (!fileName) {
    return res.status(400).json({ error: "Dosya adı belirtilmedi." });
  }

  downloadFileFromS3(config.bucketName, fileName)
    .then((downloadedFile) => {
      console.log(downloadedFile);
      res.status(200).download(downloadedFile, fileName, (err) => {
        if (err) {
          console.error("Dosya gönderilirken hata oluştu:", err);
          res.status(500).json({ error: "Dosya gönderilirken hata oluştu." });
        } else {
          console.log("Dosya başarıyla gönderildi.");
          // Dosyayı indirme işlemi tamamlandığında, geçici dosyayı silelim.
          fs.unlink(downloadedFile, (err) => {
            if (err) {
              console.error("Geçici dosya silinirken hata oluştu:", err);
            }
          });
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error: "Dosya indirilirken hata oluştu." });
    });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
