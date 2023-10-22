const baseURL = "http://127.0.0.1:8080";
document.addEventListener("DOMContentLoaded", function () {
  const uploadForm = document.getElementById("uploadForm");
  const messageDiv = document.getElementById("message");
  const downloadFileNameInput = document.getElementById('downloadFileName');
  const downloadButton = document.getElementById('downloadButton');
  const downloadMessage = document.getElementById('downloadMessage');

  // Dosya yükleme formunu dinle
  uploadForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(uploadForm);

    fetch(baseURL+ '/upload', {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        messageDiv.textContent = data.message;
        // Dosya yükleme başarılı olduğunda dosya listesini güncelle
        updateFileList();
      })
      .catch((error) => {
        messageDiv.textContent = "Dosya yüklenirken hata oluştu.";
      });
  });

  // S3 dosya listesini alıp göstermek için kullanılan fonksiyon
  function updateFileList() {
    fetch(baseURL +'/list', { method: 'GET' })
    .then(response => response.json())
    .then(data => {
      const fileList = document.getElementById('fileList');
      fileList.innerHTML = '<h2>Dosya Listesi</h2><ul>';
      data.forEach(file => {
        fileList.innerHTML += `<li>${file.Key} - ${file.LastModified}</li>`;
      });
      fileList.innerHTML += '</ul>';
    })
    .catch(error => console.error(error));
  }

      downloadButton.addEventListener('click', function() {
      const fileName = downloadFileNameInput.value;
  
      if (!fileName) {
        downloadMessage.textContent = 'Dosya adı girin.';
      } else {
        fetch(baseURL+`/download?fileName=${fileName}`, {
          method: 'GET'
        })
          .then(response => response.blob())
          .then(blob => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(a.href);
          })
          .catch(error => {
            downloadMessage.textContent = 'Dosya indirilirken hata oluştu.'+ error;
          });
      }
    });

  // Sayfa yüklendiğinde dosya listesini güncelleyin
  updateFileList();
});
