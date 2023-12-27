import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './Routes/AuthRoute.js';
import userRouter from './Routes/UserRoute.js';
import postRoute from './Routes/PostRoute.js';
import uploadRoute from './Routes/UploadRoute.js';
import ChatRoute from './Routes/ChatRoute.js';
import MessageRoute from './Routes/MessageRoute.js';

dotenv.config();

const app = express();

app.use(express.static('public'))
app.use('/images',express.static('images'))


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// --------------MongoDB Connection--------------------------------------------------------
mongoose
  .connect(
    process.env.MONGO_DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server listening at ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });



  app.use('/auth',authRoute);
  app.use('/user',userRouter);
  app.use('/post',postRoute);
  app.use('/upload',uploadRoute);
  app.use('/chat',ChatRoute);
  app.use('/message',MessageRoute);