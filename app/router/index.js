const express = require("express");
const router = express.Router();

const imgRoutes = require("./routes/img.buffer.routes");

router.use("/image", imgRoutes);

module.exports = router;
