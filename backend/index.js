import express from "express";
import cors from "cors";
import ImageKit from "imagekit";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();


const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, 
  })
);

const connect = async ()=> {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connect to MongoDb")
  } catch (error) {
    console.log(error)
    
  }
}




const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.json(result);
});

app.listen(port, () => {
  connect()
  console.log("server listening on port 3000");
});

