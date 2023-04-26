const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname,'Week1_Day1_Workout.mp4');
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1;

    const chunksize = (end-start)+1;
    const file = fs.createReadStream(filePath, {start, end});
    const head = {
      'Content-Type': 'video/mp4',
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Content-Length': chunksize
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Type': 'video/mp4',
      'Content-Length': fileSize,
      'Content-Disposition': 'inline'
    };
    res.writeHead(200, head);
    const ffmpeg = spawn('ffmpeg', ['-i', filePath, '-f', 'mp4', '-']);
    ffmpeg.stdout.pipe(res);
  }
});

server.listen(3000,()=>{
  console.log('Server Runing on port 3000')
});



// En este ejemplo, se crea un servidor HTTP utilizando el módulo 
// http.createServer() que utiliza el módulo child_process.spawn() 
// para ejecutar el comando ffmpeg y procesar la transmisión de 
// video en tiempo real. Luego, se utiliza el método pipe() para 
// enviar los datos de salida del proceso ffmpeg al 
// stream de escritura de la respuesta HTTP.

// child_process: proporciona una manera de crear procesos secundarios desde Node.js. 
// En este caso, se utiliza para crear un proceso secundario para ejecutar ffmpeg.
// http: proporciona funcionalidad para crear servidores web y manejar solicitudes y respuestas HTTP.
// path: proporciona utilidades para trabajar con rutas de archivos y directorios.
// fs: proporciona funcionalidad para trabajar con el sistema de archivos.

// Luego, se crea un servidor HTTP usando http.createServer():
// El servidor manejará todas las solicitudes HTTP entrantes.

// Dentro de la función del controlador de solicitudes HTTP, se especifica la 
// ubicación del archivo de video a transmitir y se obtiene su tamaño en bytes:
// A continuación, se verifica si la solicitud incluye un encabezado Range, lo que indica que el cliente
// solo quiere recibir una parte específica del archivo de video

// Si se especifica el encabezado Range, el servidor responde con un código de estado 206
//  Partial Content, que indica que solo se está transmitiendo una parte del archivo, 
//  y establece el encabezado Content-Range con los bytes de inicio y fin de la 
//  parte del archivo que se está transmitiendo

// Si no se especifica el encabezado Range, el servidor responde con un código de 
// estado 200 OK y establece los encabezados Content-Length, Content-Type y 
// Content-Disposition para el archivo de video completo

// Finalmente, se crea un proceso secundario ffmpeg para transmitir el archivo de video. 
// ffmpeg es una herramienta de línea de comandos que se utiliza para la conversión de 
// formatos multimedia y la transmisión de archivos multimedia en tiempo real. 
// En este caso, se utiliza para transmitir el archivo de video en formato mp4 a 
// través de HTTP
// En la línea 64, creamos una instancia de ChildProcess con spawn, que ejecuta el 
// comando ffmpeg con los argumentos -i, filePath, -f, y -. Aquí es donde se realiza
//  la conversión de formato de video.

// Luego, en la línea 66, se toma el flujo de salida estándar (stdout) del proceso 
// ffmpeg y se lo conecta directamente al flujo de respuesta (res) que se envía al 
// cliente a través de la conexión HTTP.

// De esta manera, los datos que ffmpeg emite en su salida estándar son enviados 
// en tiempo real al cliente a través de la respuesta HTTP. Como resultado, el cliente
//  puede comenzar a reproducir el video en su navegador mientras aún se está convirtiendo.

//  Es importante destacar que, al usar la tubería (pipe) para conectar el flujo de salida 
//  de ffmpeg directamente al flujo de respuesta HTTP, se evita tener que cargar todo 
//  el video en memoria antes de enviarlo al cliente. Esto es especialmente importante 
//  cuando se manejan archivos grandes, como en el caso de videos de larga duración o 
//  alta calidad.

// Finalmente, en la línea 71, se inicia el servidor HTTP escuchando en el puerto 3000.