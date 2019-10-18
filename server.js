const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const app = express();
const favicon = require("serve-favicon");

// Connect to Database
connectDB();
// init middleware
app.use(express.json({ extended: false }));
// define routes
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// serve static assets in production
if (process.env.NODE.ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
