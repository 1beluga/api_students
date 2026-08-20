import express from "express";
import studentRoute from "./route/studentRoute";
import authRoute from "./route/authRoute";
import statsRoute from "./route/statsRoute"
import cors from 'cors';

const app = express();
const PORT = process.env.port || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'https://api-students-five.vercel.app'],
  credentials: true,
}));

app.use(express.json());
app.use('/api/students', studentRoute);
app.use('/api/auth', authRoute);
app.use('/api/stats', statsRoute);

app.listen(PORT, () => {
  console.log(`App listening to PORT: ${PORT}`);
})
