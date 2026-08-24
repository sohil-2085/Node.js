import Tour from "./tour.model.js";

export const createTour = async (tourData) => {
  const tour = await Tour.create(tourData);

  return tour;
};

export const getAllTours = async () => {
  const tours = await Tour.find();

  return tours;
};

export const getTourById = async (tourId) => {
  const tour = await Tour.findById(tourId);

  return tour;
};

export const updateTour = async (tourId, updateData) => {
  const tour = await Tour.findByIdAndUpdate(tourId, updateData, {
    returnDocument: "after",
    runValidators: true,
  });

  return tour;
};

export const deleteTour = async (tourId) => {
  const tour = await Tour.findByIdAndDelete(tourId);

  return tour;
};
