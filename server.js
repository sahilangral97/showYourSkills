const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const { MONGOURL } = require("./config/keys");
const mongoose = require("mongoose");

require("./models/user");
require("./models/project");
const routes = require("./routes/auth");

mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", () => {
  console.log("Connected to the Database");
});

mongoose.connection.on("error", (err) => {
  console.log(`Error in connecting ${err}`);
});
app.use(cors());
app.use(express.json());
app.use("/", routes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("projectgallery/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "projectgallery", "build", "index.html")
    );
  });
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
