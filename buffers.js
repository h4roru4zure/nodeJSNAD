//import { Buffer } from 'node:buffer';
const Buffer = require('buffer').Buffer
// Creates a zero-filled Buffer of length 10.
const buf1 = Buffer.alloc(10)

// Creates a Buffer of length 10,
// filled with bytes which all have the value `1`.
const buf2 = Buffer.alloc(10, 1)
// Creates an uninitialized buffer of length 10.
// This is faster than calling Buffer.alloc() but the returned
// Buffer instance might contain old data that needs to be
// overwritten using fill(), write(), or other functions that fill the Buffer's
// contents.
const buf3 = Buffer.allocUnsafe(10).fill()

console.log(buf1)
console.log(buf2)
console.log(buf3)

const MB =  1024 * 1024; // número de bytes en un gigabyte
const chunkSize = 1 * MB; // tamaño del fragmento en gigabytes
const numChunks = 20; // número total de fragmentos

const chunks = [];
for (let i = 0; i < numChunks; i++) {
  chunks.push(Buffer.allocUnsafe(chunkSize).fill(01));
}

const finalBuffer = Buffer.concat(chunks);

console.log(finalBuffer)
const buf4 = Buffer.from