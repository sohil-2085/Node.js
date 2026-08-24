import { createReadStream, createWriteStream } from "node:fs";

const inputPath = new URL("./data/task.json", import.meta.url);
const outputPath = new URL("./data/task-stream-output.json", import.meta.url);

const chunks = [];

const readableStream = createReadStream(inputPath, {
  encoding: "utf-8",
  highWaterMark: 64,
});

readableStream.on("data", (chunk) => {
  console.log(`Received chunk : ${chunk.length} characters`);
  chunks.push(chunk);
});

readableStream.on("end", () => {
  try {
    const fileContent = chunks.join("");
    const tasks = JSON.parse(fileContent);

    const completedTasks = tasks.filter((task) => task.completed === true);

    const writableStream = createWriteStream(outputPath, {
      encoding: "utf-8",
    });

    writableStream.write(JSON.stringify(completedTasks, null, 2));
    writableStream.end();

    writableStream.on("finish", () => {
      console.log("completed tasks written successfully");
    });

    writableStream.on("error", (error) => {
      console.log("Error writing file:", error);
    });
  } catch (error) {
    console.log("Error parsing JSON: ", error);
  }
});

readableStream.on("error", (error) => {
  console.log("Error reading file: ", error);
});
