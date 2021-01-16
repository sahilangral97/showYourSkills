const express = require("express");
const app = express();
const PORT = 5000;
const { MONGOURL } = require("./keys");
const mongoose = require("mongoose");
require("./models/user");
const routes = require("./routes/auth");

mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", () => {
  console.log("Connected to the Database");
});

mongoose.connection.on("error", (err) => {
  console.log(`Error in connecting ${err}`);
});
app.use(express.json());
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
