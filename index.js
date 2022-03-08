require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
const morgan = require("morgan");

const upload = require("express-fileupload");
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(upload({ debug: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json())

app.use(require('./routes/users.route'))
app.use(require('./routes/child.routes'))
app.use(require('./routes/gallery.route'))
app.use(require('./routes/event.route'))

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


app.listen(process.env.PORT, () => console.log('Connected...'))