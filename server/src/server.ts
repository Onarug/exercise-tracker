import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { disconnectDB } from './utils/prisma.js'
import authRoutes from './routes/authRoutes.js'
import workoutRoutes from './routes/workoutRoutes.js'
import cookieParser from 'cookie-parser'



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin : `http://localhost:5173`,
    credentials : true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/workout",workoutRoutes)


const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})


process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection: ", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});


//Handle uncaught execeptions
process.on("uncaughtException",(err)=>{
    console.error("Uncaught Exception: ", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// Signal to terminate service before exiting formally
process.on("SIGTERM",()=>{
    console.error("SIGTERM recieved shutting down");
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});




