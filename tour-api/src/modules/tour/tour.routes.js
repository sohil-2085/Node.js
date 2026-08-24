import express from "express";
import {
  createTourController,
  deleteTourByIdController,
  getAllTourController,
  getTourByIdController,
  updateTourByIdController,
} from "./tour.controller.js";

const router = express.Router();

router.route("/").get(getAllTourController).post(createTourController);

router
  .route("/:id")
  .get(getTourByIdController)
  .patch(updateTourByIdController)
  .delete(deleteTourByIdController);

export default router;
