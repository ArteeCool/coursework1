import { config } from "dotenv";
import express from "express";
import router from "./routers/event.router.ts";
import { connectDB } from "./config/db.ts";
import cors from "cors";
config();
const app: express.Express = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/events", router);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
