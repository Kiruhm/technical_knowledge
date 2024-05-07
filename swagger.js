const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.1',
    info: {
        title: 'Technical Knowledge',
        version: '1.0.0',
        description: '',
    },
    servers: [
        { 
            url: 'http://localhost:3030/api'
        }
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js', './components/schemes.js']
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;