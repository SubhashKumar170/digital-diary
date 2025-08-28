const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const entryRoutes = require('./routes/entryRoutes')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000


app.use(cors())
app.use(express.json())

app.use('/api', entryRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch(err => {
        console.log('error in MongoDb connection ', err)
    })


app.listen(PORT, () =>{
    console.log(`Server started at port ${PORT}`);
})



