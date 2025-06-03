const { uploadToS3, ensureFolderExists } = require("../helpers/config/s3/s3")
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

        let resObj = {
            message: "Image has been uploaded",
            link: uploadImg?.Location
        }

        await images.create({
            url: resObj?.link
        })

        return successfulResponse(res, resObj)
    } catch (error) {
        return InternalServerError(req, error)
    }
}