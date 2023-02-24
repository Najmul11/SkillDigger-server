import mongoose from "mongoose";
// 'mongodb+srv://skilldigger:skilldigger@cluster0.u5tj5cw.mongodb.net/SkillDigger?retryWrites=true'
export const connectDb= async()=>{
   try {
    await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology:true})
    console.log('db connected with localhost');
   } catch (error) {
    console.log(error.message);
   }
}