import fs from "fs";

const stream = fs.createReadStream("./files/input.txt", {
  highWaterMark: 10,
});

stream.on("data", (chunk) => {
  console.log("recieved chunk");
  // console.log("Chunk Size", chunk.length);
  console.log(chunk.toString());
});

stream.on("end", () => {
  console.log("Finished reading file");
});

stream.on("error", (error) => {
  console.error("Error:", error);
});
