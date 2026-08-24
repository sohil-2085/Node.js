export const validate = (req, res, next) => {
  const { title, priority, completed } = req.body || {};

  if (!title) {
    return res.status(400).json({
      status: "fail",
      message: "Title Required",
    });
  }

  if (priority !== undefined && !["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({
      status: "fail",
      message: "Priority must be high, low or medium",
    });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      status: "fail",
      message: "Completed must be true or false",
    });
  }

  next();
};
