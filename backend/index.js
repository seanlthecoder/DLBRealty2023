// npm i bcryptjs body-parser cors dotenv express  mongoose
// npm i -g nodemon eslint-plugin-node eslint
// npm i passport passport-jwt jsonwebtoken

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const cors = require("cors");
const mongoose = require("./db.js");
const userRouter = require("./routes/UserRoutes.js");
const bodyParser = require("body-parser");
const passport = require('./helpers/passport.js');
const fileRouter = require("./routes/FileRoutes.js");
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(passport.initialize());
app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/UserRoutes.js"],
};
const specs = swaggerJsdoc(options);
app.use(userRouter);
app.use(fileRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log("Server is running... at port " + port);
});

// 64b315c454c0f50224cb574e

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjMxYTgxOTBjNjAwYWFjNDBkMWYyNSIsImlhdCI6MTY4OTQ1OTM1M30.cn5Ae4mzRxvkldmJS-0HvvzWNP3fQaytrKfp3QCCKtU
