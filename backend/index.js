
import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})
import connectDB from './src/config/db.js'
import app from './src/app.js'

connectDB()
.then(() => {
    app.listen(process.env.PORT, ()=> {
        console.log(`server running on port: ${process.env.PORT}`)
    })
})
.catch('error',(error)=>{
    console.log(`Server error! ${error}`)
})