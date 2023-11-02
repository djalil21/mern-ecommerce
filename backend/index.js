if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const mongoSanitize = require("express-mongo-sanitize");
var morgan = require('morgan')

const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const stripeRoute = require('./routes/stripe')
const cors = require('cors')

const dbUrl = process.env.ATLAS_URL || "mongodb://127.0.0.1:27017/mern-ecommerce";
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected", dbUrl);
});

app.use(cors())
app.use(express.json())
app.use(mongoSanitize());
app.use(morgan('dev'))

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)
app.use("/api/checkout", stripeRoute);



app.get('/', (req, res) => {
    res.send('hey')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("hosted on ", port)
})