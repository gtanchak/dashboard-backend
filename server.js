const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const connectDB = require("./config/db");

// router file
const bootcamps = require("./routes/bootcamps");

dotenv.config({ path: "./config/config.env" });

const app = express();

connectDB();

// loading middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// mount route
app.use("/api/v1/bootcamps", bootcamps);

// port
const PORT = process.env.PORT || 5000;

// server
const server = app.listen(PORT, () =>
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// unhandled Error
process.on("unhandled error", (err, promise) => {
  console.log(`Error: ${err.message}`);

  server.close(() => process.exit(1));
});
