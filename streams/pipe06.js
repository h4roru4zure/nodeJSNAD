
const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname,'Week1_Day1_Workout.mp4');
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;

    const head = {
      'Content-Type': 'video/mp4',
      'Content-Length': fileSize,
      'Content-Disposition': 'inline'
    }
    res.writeHead(200, head);
    const ffmpeg = spawn('ffmpeg', ['-i', filePath, '-c:v', 'libx264', '-f', 'mp4', '-']);
    //const ffmpeg = spawn('ffmpeg', ['-i', filePath, '-f', 'mp4', '-']);
    ffmpeg.stdout.pipe(res);
  
});

server.listen(3000,()=>{
  console.log('Server Runing on port 3000')
});
