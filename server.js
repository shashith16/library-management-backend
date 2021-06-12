const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/AuthRoutes");
const bookRoutes = require("./routes/BooksRoutes");
const userRoutes = require("./routes/UserRoutes");
const verifyJwtToken = require("./middlewares/verifyToken");

///console.log(authRoute);
const app = express();
app.use(express.json());

app.use(cors());
const PORT = process.env.PORT || 5000;

app.use("/lms/", authRoutes);
app.use("/lms/books", verifyJwtToken, bookRoutes);
app.use("/lms/user", verifyJwtToken, userRoutes);

const connectionUrl =
  "mongodb+srv://admin:admin123@cluster0.ukirt.mongodb.net/LMS_DB?retryWrites=true&w=majority";

mongoose
  .connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server Running on Port: http://localhost:${PORT}`);
    })
  )
  .catch((error) => console.log(`${error} did not connect`));
