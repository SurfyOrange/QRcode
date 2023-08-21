const colorSelect = document.getElementById("colorSelect");
const textButton = document.getElementById("textButton");
const fileButton = document.getElementById("fileButton");

colorSelect.addEventListener("change", () => {
  const selectedColor = colorSelect.value;
  document.body.style.backgroundColor = selectedColor;
});

textButton.addEventListener("click", () => {
  const textInput = document.getElementById("textInput").value;
  if (textInput) {
    const qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = ""; // Clear any previous QR code

    const qrcode = new QRCode(qrcodeContainer, {
      text: textInput,
      width: 128,
      height: 128
    });
  } else {
    alert("Please enter text to generate QR code.");
  }
});

const fileInput = document.getElementById('fileInput');
const decodeButton = document.getElementById('fileButton');
const decodedText = document.getElementById('decodedText');

let imgDataUrl = null;

fileInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) {
    imgDataUrl = null;
    decodedText.textContent = '';
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    imgDataUrl = reader.result;
    decodedText.textContent = ''; // Clear previous decoded text
    decodeButton.disabled = false; // Enable the decode button
  };

  reader.readAsDataURL(file);
});

decodeButton.addEventListener('click', function () {
  if (imgDataUrl) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

      if (qrCode) {
        console.log("Decoded data:", qrCode.data);
        decodedText.textContent = qrCode.data;
      } else {
        console.log("No QR code found.");
      }
    };

    img.src = imgDataUrl;
  } else {
    alert("Please upload an image first.");
  }
});
