import express from "express";
import tourRouter from "./modules/tour/tour.routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/tours", tourRouter);

export default app;
