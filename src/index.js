import dotenv from "dotenv"
import connectToDB from "./db/index.js"
import { app } from "./app.js"


dotenv.config()


connectToDB()
.then(()=>{
  app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log('mongodb connection failed' , err)
  throw err
})


/*

//ifee -> imediate invoked function for connect to db
import express from "express";
const app = express()
(async()=>{
try {
 await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
app.on("error",(error)=>{
  console.log(error)
  throw error
})

app.listen(process.env.PORT,()=>{
  console.log(`process is running`)
})

} catch (error) {
  console.error("Error:",error)
  throw error
}
})()

*/