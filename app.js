const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require('./swagger.js')
const app = express()

const userRouter = require('./routes/user.js')

// ------------------------------------------------------- Middlewares ------------------------------------------------------- //

// Logger
app.use((req, res, next) => {
    console.log("[" + req.method + "]\t", req.url + ' -', Date.now())
    next()
})

// JSON parser middleware
app.use(express.json())

// Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

// Handle the users endpoint
app.use('/api/users', userRouter)

// Handle not implemented endpoints in request-response cycle
app.use((req, res) => {
    res.status(501).json({ msg: 'Endpoint not implemented' });
});

// Handle errors in request-response cycle
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ msg: 'Internal Server Error' })
})

// ---------------------------------------------------------------------------------------------------------------------------- //

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server listening on port " + port)
})