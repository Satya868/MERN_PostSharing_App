import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from 'cors'
import dotenv from "dotenv";

const app = express();
app.use(cors({
  origin: ['http://localhost:3000']
}))
mongoose.set('strictQuery', false);

dotenv.config(); //gootcha...  go to frontend

app.use(express.static('public')); 
app.use('/images', express.static('images'));
app.use(express.json())

const PORT = process.env.PORT || 5000

app.use("/api/user", router)
app.use("/api/blog", blogRouter)

// for deployment in heroku


mongoose
  .connect(
    "mongodb+srv://868satya:sPJSBe4WdUYpjD1M@cluster0.e4ia5tb.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(PORT))
  .then(() => console.log(`${PORT} pe race laga rhe hai...`))
  .catch((err) => console.log("error hai, network check karo"));
