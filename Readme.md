## AWS S3 Dosya Yükleme (AWS S3 File Upload)
```markdown
## Açıklama (Description)
Bu uygulama, AWS SDK for JavaScript (v3) kullanarak AWS S3'e dosya yükleme işlemini gösterir.
This application demonstrates how to upload files to AWS S3 using AWS SDK for JavaScript (v3).

## Kurulum (Installation)
Projenin çalışabilmesi için aşağıdaki adımları takip edin:
To get the project up and running, follow these steps:

1. Projeyi yerel makinenize klonlayın.
   Clone the project to your local machine.
   
2. Proje klasörüne gidin:
   Navigate to the project folder:
   ```sh
   cd aws-s3-file-upload
   ```

3. Gerekli npm paketlerini yüklemek için aşağıdaki komutu çalıştırın:
   Install the required npm packages by running:
   ```sh
   npm install
   ```

4. `config.json` dosyasını düzenleyin ve AWS kimlik bilgilerinizi, hedef S3 depolama adını ve bölgeyi ayarlayın. Örnek `config.json` yapısı:

```json
{
  "awsConfig": {
    "region": "us-east-1",
    "credentials": {
      "accessKeyId": "YOUR_ACCESS_KEY",
      "secretAccessKey": "YOUR_SECRET_ACCESS_KEY"
    }
  },
  "bucketName": "test"
}
```

## Kullanım (Usage)
Proje kurulumu tamamlandıktan sonra dosyaları AWS S3'e yüklemek için aşağıdaki adımları izleyin:
After the project setup is complete, follow these steps to upload files to AWS S3:

1. AWS kimlik bilgilerinizi ve hedef S3 depolama adını `config.json` dosyasında ayarladığınızdan emin olun.

2. Yüklemek istediğiniz dosyanın adını ve hedef klasörün yolunu belirleyin ve `uploadFileToS3` fonksiyonunu kullanarak dosyayı yükleyin.
   Determine the name of the file you want to upload and the path of the target folder. Use the `uploadFileToS3` function to upload the file.

Örnek kullanım (Example Usage):
```javascript
const key = "test/adsiz.png";
const filePath = "adsiz.png";

uploadFileToS3(key, filePath);
```

3. AWS SDK v3'ü kullanarak S3'e yüklenen dosyaları bulmak için AWS Management Console veya AWS SDK v3 ile S3 API'lerini kullanabilirsiniz.
   To locate files uploaded to S3 using AWS SDK v3, you can use the AWS Management Console or the S3 APIs provided by AWS SDK v3.

