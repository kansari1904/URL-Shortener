const express = require('express');
const path = require('path');
const connectDB = require('./database/db')
const URL = require("./models/url")

const urlRouter = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRouter = require('./routes/user')

const app = express();
const PORT = 8000;

//db
connectDB('mongodb+srv://user_12:khalid12@codegyan.7jtlw.mongodb.net/?retryWrites=true&w=majority&appName=CodeGyan').then(()=>{
    console.log("Database connected.. ")
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))


//Router

app.use('/url', urlRouter);
app.use('/', staticRoute);
app.use('/user', userRouter)



app.listen(PORT, ()=> console.log(`Server Started at ${PORT}`))