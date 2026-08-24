import {
  createTour,
  deleteTour,
  getAllTours,
  getTourById,
  updateTour,
} from "./tour.service.js";

export const createTourController = async (req, res) => {
  const tour = await createTour(req.body);

  res.status(201).json({
    status: "success",
    data: {
      tour,
    },
  });
};

export const getAllTourController = async (req, res) => {
  const tours = await getAllTours();

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

export const getTourByIdController = async (req, res) => {
  const tour = await getTourById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

export const updateTourByIdController = async (req, res) => {
  const tour = await updateTour(req.params.id, req.body);

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

export const deleteTourByIdController = async (req, res) => {
  const tour = await deleteTour(req.params.id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Tour not found",
    });
  }

  res.status(204).send();
};
