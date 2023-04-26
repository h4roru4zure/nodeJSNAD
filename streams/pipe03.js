const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    const readStream = fs.createReadStream('lotoFacil.csv');
    readStream.pipe(res);
    
});

server.listen(3000);

// En este ejemplo, se crea un servidor HTTP utilizando el módulo 
// http.createServer() que envía el archivo "archivo_grande.mp4" o csv
// utilizando el método pipe() desde el stream 
// de lectura del archivo hacia el stream de escritura de la respuesta HTTP.


// const express = require('express');
// const app = express();


// app.get('/download', (req, res) => {

//   const filePath = __dirname+'/lotoFacil.csv';
//   res.sendFile(filePath);
// });

// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });
