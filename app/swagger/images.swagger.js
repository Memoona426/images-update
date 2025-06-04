/**
 * @swagger
 * tags:
 *   - name: Image
 *     description: Image upload API endpoints
 */

/**
 * @swagger
 * /api/image/upload:
 *   post:
 *     summary: Upload an image to S3 and save its URL to the database
 *     tags: [Image]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Image uploaded successfully
 *                 link:
 *                   type: string
 *                   example: https://your-bucket-name.s3.amazonaws.com/uploads/yourimage.jpg
 *       400:
 *         description: Bad request - No file provided or bucket issue
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/image/update/{id}:
 *   put:
 *     summary: Update an existing image by ID
 *     tags: [Image]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the image to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image has been updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Image has been updated
 *                 link:
 *                   type: string
 *                   example: https://your-bucket-name.s3.amazonaws.com/uploads/updatedimage.jpg
 *       400:
 *         description: Bad request - File or bucket/image not found
 *       404:
 *         description: Image not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/image/get:
 *   get:
 *     summary: Retrieve all uploaded images
 *     tags: [Image]
 *     responses:
 *       200:
 *         description: A list of all images
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Images have been fetched
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       url:
 *                         type: string
 *       404:
 *         description: No images found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/image/delete:
 *   delete:
 *     summary: Delete an image by its ID
 *     tags: [Image]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the image to delete
 *     responses:
 *       200:
 *         description: Image has been deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Image has been deleted
 *       400:
 *         description: No image found or deletion from S3 failed
 *       500:
 *         description: Internal server error
 */
