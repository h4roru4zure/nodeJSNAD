// There are four fundamental stream types within Node.js:

// Writable: streams to which data can be written (for example, fs.createWriteStream()).
// Readable: streams from which data can be read (for example, fs.createReadStream()).
// Duplex: streams that are both Readable and Writable (for example, net.Socket).
// Transform: Duplex streams that can modify or transform the data as it is written and read (for example, zlib.createDeflate()).
// Additionally, this module includes the utility functions :
// stream.pipeline(), stream.finished(), stream.Readable.from() and stream.addAbortSignal().


// 1.-¿Cuál es la diferencia entre un stream de lectura y un stream de escritura en Node.js?
//  ¿Cuál es el propósito de cada uno de ellos y cómo se crean?
//--- la diferencia es que el stream de lectura se usa la leer o para la entrada de datos 
//    y el de escritura para la salida de datos o escritura o guardado de los datos. 

const fs = require('fs');

// // Creamos un stream de lectura
const readStream = fs.createReadStream('output.json');

// // Creamos un stream de escritura
const writeStream =  fs.createWriteStream('nuevo-output.txt');
// Pipe el stream de lectura al stream de escritura
 readStream.pipe(writeStream);
// Escuchar el evento 'finish' en el stream de escritura
writeStream.on('finish', () => {
    console.log('Archivo escrito exitosamente.');
  });

//2.-¿Cuál es la diferencia entre los modos de flujo legibles en Node.js, "flujos de objeto" y "flujos de buffer"? 
//¿Cómo se crea un flujo legible de cada tipo?

// Flujos de objeto: transmiten objetos JavaScript a través del flujo en lugar de buffers o 
// cadenas. Cada objeto se considera un "chunk" de datos en el flujo. Los flujos de objeto son útiles 
// cuando se trabaja con objetos grandes o complejos que pueden ser difíciles de procesar 
// como buffers o cadenas. Para crear un flujo legible de objeto, 
// puedes usar la clase Readable y agregar objetos al flujo usando el método push().

const { Readable } = require('stream');

const objectStream = new Readable({
  objectMode: true,
  read() {}
});

objectStream.push({ name: 'John', age: 30 });
objectStream.push({ name: 'Jane', age: 25 });
objectStream.push({ name: 'will', age: 45 });
objectStream.push({ name: 'thor', age: 35 });
objectStream.push(null); // Señaliza el final del flujo

const { Writable } = require('stream');

const objStream = new Writable({
    objectMode: true,
    write(chunk, encoding, callback) {
        console.log(`Nombre: ${chunk.name}, Edad: ${chunk.age}`);
        callback();
        const data = JSON.stringify(chunk);
        fs.appendFile('output.json', data + '\n', callback);
        
        
    }
  });

objectStream.pipe(objStream);

//  Flujos de buffer: transmiten buffers o cadenas de texto a través del flujo. 
//  Cada buffer o cadena se considera un "chunk" de datos en el flujo. Los flujos de 
//  buffer son útiles cuando se trabaja con datos binarios o texto plano. Para crear
//  un flujo legible de buffer, puedes  usar la clase Readable y 
//  agregar buffers o cadenas al flujo usando el método push().

//const { Readable } = require('stream');

const bufferStream = new Readable({
  read() {}
});

bufferStream.push('Hola');
bufferStream.push('Mundo');
bufferStream.push(null); // Señaliza el final del flujo
