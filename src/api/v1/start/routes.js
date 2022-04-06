import tutorRoutes from "../components/tutor/routes";
import userRoutes from "../components/users/routes";
const startRoutes = (app) => {
  // routes
  app.use("/users", userRoutes);
  app.use("/tutors", tutorRoutes);

  //404
  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  //500 - Error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err.message,
      status: err.status || 500,
    });
  });
};

export default startRoutes;
