const NodeWebcam = require('node-webcam');

// Opciones de configuración para la cámara web
const opts = {
  width: 640,
  height: 480,
  quality: 100,
  delay: 0,
  saveShots: true,
  output: "jpeg",
  device: false,
  callbackReturn: "buffer",
  verbose: false
};

// Crear una instancia de la cámara web
const Webcam = NodeWebcam.create(opts);

// Capturar una imagen de la cámara web
Webcam.capture("test_picture", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Imagen capturada: ", data);
  }
});
