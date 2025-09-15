import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import health_declarations_router from "./routes/health-declarations";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/health-declarations", health_declarations_router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
