const express = require("express");
const cors = require("cors");
const router = require("./routes/routes.js");

const port = 8080;
const app = express();

app.use(cors());

app.use(express.static("./frontend/dist"));
app.use("/api/foods", router);

app.listen(port, () => {
    console.log(`SERVER: Listening on port ${port}`);
})