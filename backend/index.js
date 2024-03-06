const express = require("express");
const cors = require("cors");
const router = require("./routes/routes.js");
const path = require("path");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "/build")));
app.use("/api/foods", router);

app.listen(port, () => {
    console.log(`SERVER: Listening on port ${port}`);
})