// Comprimir un archivo utilizando el módulo zlib y 
// escribir los datos comprimidos en otro archivo 
const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('lotoFacil.csv');
const writeStream = fs.createWriteStream('lotoFacil.csv.gz');
const gzipStream = zlib.createGzip();

readStream.pipe(gzipStream).pipe(writeStream);

//  En este ejemplo, se crea un stream de lectura que lee datos del archivo 
//  "archivo_origen.txt", se crea un stream de escritura que escribe los datos
//  comprimidos en el archivo "archivo_destino.txt.gz" y se crea un stream de 
//  compresión utilizando el módulo zlib.createGzip(). Luego, se utiliza 
//  el método pipe() para conectar los tres streams.