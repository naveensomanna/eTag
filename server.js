import http from "http"
import fs from "fs";
import crypto from "crypto";



const server = http.createServer((req, res) => {
  const filePath = "./example.html";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log("Error while reading file")
    } else {
      // creating a hex value based on content
      const hash = crypto.createHash('sha256');
      hash.update(data)
      const etag = `${hash.digest('hex')}`;

      // from browser if none match will come
      const clientTag = req.headers['if-none-match'];


      // browser etag and generated etag is same not sending the data
      // it will change when content of the file changes

      if (clientTag && clientTag === etag) {
        res.writeHead(304, 'Not Modified');
        res.end();
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html',
          'ETag': etag
        })
        res.end(data)
      }
    }
  })

})


const port = 3000;

// Start the server


server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
})
