const { deleteImageFromS3 } = require("../config/s3")
const { uploadToS3, ensureFolderExists, deleteFromS3 } = require("../helpers/config/s3/s3")
const { InternalServerError, successfulResponse } = require("../helpers/response")
const db = require("../model")
const { images } = db

exports.readAndStoreImg = async (req, res) => {
    const { file } = req
    try {

        if (!file) {
            return res.status(400).json({ status: false, message: "no file Found" })
        }
        const isBucketExists = await ensureFolderExists("mybucketimage2222", "images")

        if (!isBucketExists) {
            return res.status(400).json({ status: false, message: "no Bucket Found" })
        }
        const uploadImg = await uploadToS3(file, process.env.SPACENAME, null, file?.originalname)

        const imageExists = await images.findOne({
            where: {
                url: uploadImg?.Location,
                name: file?.originalname
            }
        })

        if (imageExists) {
            return res.status(400).json({ status: false, message: "Already exists in database" })
        }

        let resObj = {
            message: "Image has been uploaded",
            link: uploadImg?.Location
        }

        if (!uploadImg?.alreadyExists) {
            await images.create({
                url: resObj?.link,
                name: file?.originalname
            })
        }

        return successfulResponse(res, resObj)
    } catch (error) {
        return InternalServerError(req, error)
    }
}

exports.updateImg = async (req, res) => {
    const { id } = req.params;
    const { file } = req;

    try {
        if (!file) {
            return res.status(400).json({ status: false, message: "No file found" });
        }

        const isBucketExists = await ensureFolderExists("mybucketimage2222", "images");
        if (!isBucketExists) {
            return res.status(400).json({ status: false, message: "No bucket found" });
        }

        const imgExists = await images.findOne({ where: { id } });
        if (!imgExists) {
            return res.status(404).json({ status: false, message: "Image not found" });
        }

        const isS3ImgDeleted = await deleteFromS3(process.env.SPACENAME, imgExists.name);
        if (!isS3ImgDeleted) {
            return res.status(500).json({ status: false, message: "Failed to delete image from S3" });
        }

        const uploadedImg = await uploadToS3(file, process.env.SPACENAME, null, file.originalname);
        if (!uploadedImg?.Location) {
            return res.status(500).json({ status: false, message: "Image upload failed" });
        }

        await images.update(
            {
                url: uploadedImg.Location,
                name: file.originalname,
            },
            {
                where: { id }
            }
        );

        return successfulResponse(res, {
            message: "Image has been updated",
            link: uploadedImg.Location,
        });

    } catch (error) {
        console.error("Error in updateImg:", error);
        return InternalServerError(req, error);
    }
};


exports.getAllImag = async (req, res) => {
    try {
        const imageList = await images.findAll();

        if (!imageList || imageList.length === 0) {
            return res.status(404).json({ status: false, message: "No images found" });
        }

        const resObj = {
            message: "Images have been fetched",
            data: imageList
        };

        return successfulResponse(res, resObj);
    } catch (error) {
        return InternalServerError(req, error);
    }
};


exports.deleteImgById = async (req, res) => {
    const { id } = req.query;

    try {
        const imgExists = await images.findOne({ where: { id } });

        if (!imgExists) {
            return res.status(400).json({ status: false, message: "No image found" });
        }

        const isS3ImgDeleted = await deleteFromS3(process.env.SPACENAME, imgExists?.name)

        if (!isS3ImgDeleted) {
            return res.status(400).json({ status: false, message: "image not deleted from s3" });
        }

        await images.destroy({ where: { id } });

        const resObj = {
            message: "Image has been deleted"
        };

        return successfulResponse(res, resObj);
    } catch (error) {
        return InternalServerError(req, error);
    }
};
