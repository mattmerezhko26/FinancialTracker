//zCvxEZZEYm4lu80W
import express,{Express} from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";  

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string = "mongodb+srv://merezhkomatt:zCvxEZZEYm4lu80W@financetracker.qgromc5.mongodb.net/";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err)
);

app.use("/financial-records",financialRecordRouter);


app.listen(port, () => {
  console.log(`Server is running at ${port}`);
})