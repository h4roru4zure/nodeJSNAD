// Procesar un archivo CSV utilizando el módulo csv-parser y 
// enviar los datos a una base de datos

const fs = require('fs');
const csv = require('csv-parser');
const db = require('./db');

const readStream = fs.createReadStream('archivo_csv.csv');
//db no lo esta leyendo
const dbStream = db.createWriteStream();

readStream.pipe(csv()).pipe(dbStream);

// En este ejemplo, se crea un stream de lectura que lee datos del archivo 
// "archivo_csv.csv", se utiliza el módulo csv-parser para procesar los datos 
// del archivo CSV y se utiliza un stream de escritura creado por un módulo de 
// base de datos personalizado db.createWriteStream() para enviar los datos a 
// una base de datos. Luego, se utiliza el método pipe() para conectar los tres streams.