/**
 * @swagger
 * tags:
 *   - name: img
 *     description: Image upload API endpoints
 */

/**
 * @swagger
 * /api/image/upload:
 *   post:
 *     summary: Upload an image to S3 and save its URL to the database
 *     tags:
 *       - img
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
 *         description: Bad Request - No file provided or bucket/folder issue
 *       500:
 *         description: Internal Server Error
 */
