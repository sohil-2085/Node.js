import fs from "fs";
import { createGzip } from "zlib";

const readStream = fs.createReadStream(
  "./files/input.txt"
);

const gzipStream = createGzip();

const writeStream = fs.createWriteStream(
  "./output/input.txt.gz"
);

readStream
  .pipe(gzipStream)
  .pipe(writeStream);

writeStream.on("finish", () => {
  console.log("Compression complete");
});