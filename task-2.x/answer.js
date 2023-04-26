'use strict'
const {get} =require('http')

function fetch (url, cb) {
    get(url)
      .once('error', cb)
      .once('response', (res) => {
        var chunks = []
        res.on('data', (chunk) => chunks.push(chunk))
        res.once('end', () => {
          cb(null, Buffer.concat(chunks).toString())
        })
      })
  }

function answer(urlA,urlB,urlC){
    const output=((err,data)=>{
        if(err) {
            console.error(err)
            Process.exit(1)
        }
        console.log(data)
    })
    fetch(urlA,output)
    fetch(urlB,output)
    fetch(urlC,output)
}


//delete this last line beacuse we have ti deliver jus the answer not a test.
answer("http://localhost:3000/a","http://localhost:3000/b","http://localhost:3000/c")