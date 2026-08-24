import fs from "fs";

const readStream = fs.createReadStream("./files/input.txt");

const writeStream = fs.createWriteStream(
  "./output/copied.txt"
);

readStream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log("File copied successfully!");
});