import express from "express";
import cors from "cors";
import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();


const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, 
  })
);


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
  console.log("server listening on port 3000");
});

