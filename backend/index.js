import express from "express";
import cors from "cors";
import ImageKit from "imagekit";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserChats from "./models/userChats.js";
import Chat from "./models/chat.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connect to MongoDb");
  } catch (error) {
    console.log(error);
  }
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.json(result);
});

// app.get("/api/test", ClerkExpressRequireAuth(), (req, res) => {
//   const userId = req.auth.userId;
//   console.log(userId)
//   res.send("Success!")
// })

app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { text } = req.body;
  try {
    // CREATE A NEW CHAT
    const newChat = new Chat({
      userId: userId,
      history: [{ role: "user", parts: [{ text }] }],
    });

    const savedChat = await newChat.save();

    // CHECK IF THE USERCHATS EXISTS
    const userChats = await UserChats.find({ userId: userId });
    console.log("UserChats:", userChats);

    // IF DOESN'T EXIST CREATE A NEW ONE AND ADD THE CHAT IN THE CHATS ARRAY

    if (!userChats.length) {
      const newUserChats = new UserChats({
        userId: userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });
      await newUserChats.save();
    } else {
      // IF EXISTS, PUSH THE CHAT TO THE EXISTING ARRAY
      await UserChats.updateOne(
        { userId: userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );
      res.status(201).send(newChat._id);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating chat!");
  }
});

app.get("/api/userchats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const userChats = await UserChats.find({ userId });
    res.status(200).send(userChats[0].chats);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching userchats!");
  }
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});

app.listen(port, () => {
  connect();
  console.log("server listening on port 3000");
});
