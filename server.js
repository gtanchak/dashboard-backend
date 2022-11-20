const express = require("express");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOption");
const verifyJWT = require("./middleware/verifyJWT");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

// custom middleware logger
app.use(logger);

// Cross origin Resource Sharing
app.use(cors(corsOptions));

// built in middleware for form
app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

// middleware for cookie
app.use(cookieParser());

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/root"));
app.use("/login", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/register", require("./routes/register"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

app.use(errorHandler);

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
