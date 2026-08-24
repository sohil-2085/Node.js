import fs, { write } from "fs";

const writeStream = fs.createWriteStream("./output/message.txt");

writeStream.write("Hello \n");
writeStream.write("This is Stream \n");
writeStream.write("My name is Sohil Kareliya \n");

writeStream.end();

writeStream.on("finish", () => {
  console.log("finished writing");
});
