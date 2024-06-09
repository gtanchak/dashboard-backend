require("dotenv").config();
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import corsOptions from "./config/corsOption";
import credentials from "./middleware/credentials";
import errorHandler from "./middleware/errorHandler";
import { logger } from "./middleware/logEvents";
import verifyJWT from "./middleware/verifyJWT";
const app = express();

import mongoose from "mongoose";
import connectDB from "./config/dbConn";
const PORT = process.env.PORT || 3500;

// connect mongodb
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("connect to mongodb");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});