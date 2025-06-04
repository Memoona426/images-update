
const swaggerAPIPATH = process.env.PROJECT_APIS_PATH
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: process.env.PROJECT_NAME,
            description: process.env.PROJECT_DESC,
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: 'Bearer token to access these api endpoints',
                    scheme: 'bearer',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [swaggerAPIPATH],
};

module.exports = swaggerOptions