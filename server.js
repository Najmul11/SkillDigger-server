import { app } from "./app.js";
import { connectDb } from "./config/database.js";
import cloudinary from 'cloudinary'
import nodeCron from "node-cron";
import { Stats } from "./models/Stats.js";


connectDb()

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

nodeCron.schedule("0 0 0 5 * *", async () => {
  try {
    await Stats.create({});
  } catch (error) {
    console.log(error);
  }
});

  app.get('/', (req,res)=>{
    res.send( `<h1>Site is Working. click <a href='https://skill-digger.web.app/'>here</a> to visit frontend.</h1>`)
  })

app.listen(process.env.PORT, ()=>{
    console.log('server running on', process.env.PORT);
})  
