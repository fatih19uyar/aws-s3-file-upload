# AWS S3 Dosya Yükleme (AWS S3 File Upload)

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

## Kullanım (Usage)

Proje kurulumu tamamlandıktan sonra dosyaları AWS S3'e yüklemek için aşağıdaki adımları izleyin:
After the project setup is complete, follow these steps to upload files to AWS S3:

1. AWS kimlik bilgilerinizi `awsConfig` objesinde güncelleyin.
   Update your AWS credentials in the `awsConfig` object.

2. Yüklemek istediğiniz dosyanın adını ve hedef klasörün yolunu belirleyin ve `uploadFileToS3` fonksiyonunu kullanarak dosyayı yükleyin.
   Determine the name of the file you want to upload and the path of the target folder. Use the `uploadFileToS3` function to upload the file.

Örnek kullanım (Example Usage):

```javascript
const bucketName = "your-bucket-name"; // S3 depolama adı (S3 bucket name)
const key = "test/adsiz.png"; // Hedef dosya yolu (Target file path)
const filePath = "adsiz.png"; // Yerel dosya yolu (Local file path)

uploadFileToS3(bucketName, key, filePath);
```

3. AWS SDK v3'ü kullanarak S3'e yüklenen dosyaları bulmak için AWS Management Console veya AWS SDK v3 ile S3 API'lerini kullanabilirsiniz.
   To locate files uploaded to S3 using AWS SDK v3, you can use the AWS Management Console or the S3 APIs provided by AWS SDK v3.

## Lisans (License)

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasını inceleyin.
This project is licensed under the MIT License. For more information, see the `LICENSE` file.

## Nasıl Kullanılır (How to Use)

Projenin nasıl kullanılacağına dair adımları açıklayın. Özellikle, projenin nasıl başlatılacağına dair bilgi verin.
Explain how to use the project, especially how to start it.

Örnek (Example):

- İlk olarak, projenin kök dizininde aşağıdaki komutu çalıştırarak gerekli bağımlılıkları yükleyin:

- First, install the required dependencies by running the following command in the project's root directory:
    npm install

- Daha sonra, projeyi başlatmak için aşağıdaki komutu çalıştırın:
- Then, start the project by running the following command:
    npm start
