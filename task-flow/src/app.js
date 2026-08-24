import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import { loggerMiddleware } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import "./services/notificationService.js";

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(express.static("src/public"));
app.use(taskRoutes);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
