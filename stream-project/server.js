import express from "express";
import fs from "fs";

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("this is stream server");
});

// app.get("/video", (req, res) => {
//   const path = "./files/13028458_1920_1080_60fps.mp4";
//   const stream = fs.createReadStream(path);
//   stream.pipe(res);
// });

app.get("/video", (req, res) => {
  const videoPath = "./files/13028458_1920_1080_60fps.mp4";

  res.setHeader("Content-Type", "video/mp4");

  const stream = fs.createReadStream(videoPath);

  stream.on("error", (error) => {
    console.error(error);

    if (!res.headersSent) {
      res.status(500).json({
        message: "Unable to stream video",
      });
    }
  });

  stream.pipe(res);
});

app.get("/download", (req, res) => {
  const filePath = "./files/13028458_1920_1080_60fps.mp4";

  res.setHeader("Content-Disposition", "attachment; filename=13028458_1920_1080_60fps.mp4");

  res.setHeader("Content-Type", "video/mp4");

  const stream = fs.createReadStream(filePath);

  stream.pipe(res);
});

app.listen(port, () => {
  console.log(`app is listening on the port ${port}`);
});
