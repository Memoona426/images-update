const express = require("express");
const multer = require('multer');
const { readAndStoreImg, deleteImgById, getAllImag, updateImg } = require("../../controller/img.buffer.controller");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post("/upload", upload.single('file'), readAndStoreImg);
router.put("/update/:id", upload.single('file'), updateImg);
router.get("/get", getAllImag);
router.delete("/delete", deleteImgById);

module.exports = router;