import express, { Application } from "express";
import dotenv from "dotenv";
import router from "./routes/userRouter";

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use("/auth", router)


const PORT: string = process.env.PORT || "3000";

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});