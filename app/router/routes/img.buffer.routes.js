const express = require("express");
const multer = require('multer');
const { readAndStoreImg } = require("../../controller/img.buffer.controller");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post("/upload", upload.single('file'), readAndStoreImg);

module.exports = router;