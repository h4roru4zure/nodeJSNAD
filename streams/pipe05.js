// Procesar flujos de datos complejos utilizando varios streams de 
// transformación y el método pipe()

const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');

const readStream = fs.createReadStream('nuevo-output.txt');
const gzipStream = zlib.createGzip();
const encryptStream = crypto.createCipher('aes192', 'contraseña_secreta');
const writeStream = fs.createWriteStream('archivo_destino.txt.enc');

readStream.pipe(gzipStream).pipe(encryptStream).pipe(writeStream);

// En este ejemplo, se crea un stream de lectura que lee datos del archivo
// "archivo_origen.txt", se crea un stream de compresión utilizando el
// módulo `zlib.createGzip()`, se crea un stream de cifrado utilizando 
// el módulo `crypto.createCipher()` y se crea un stream de escritura 
// que escribe los datos cifrados en el archivo "archivo_destino.txt.enc".
// Luego, se utiliza el método `pipe()` para conectar los cuatro streams
// y procesar los datos de entrada de manera secuencial a través de los 
// diferentes streams de transformación.
