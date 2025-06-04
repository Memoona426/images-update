require("dotenv").config();
const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const routes = require("./app/router/index");
const { connectToDb } = require("./app/config/db");

const swaggerOptions = require("./app/config/swagger");
const { checkS3Connection, setUpCorsOnS3 } = require("./app/config/s3");
const swaggerDocs = swaggerJSDoc(swaggerOptions);


const app = express();
app.use(express.json());



app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const httpServer = http.createServer(app);

const startServer = async () => {
  try {
    console.log(" Hello from startServer - checking for Git commit!");
    await connectToDb();
    await checkS3Connection()
    await setUpCorsOnS3()

    const PORT = process.env.HTTP_PORT || 3000;

    httpServer.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

