import express from "express";
import studentRoute from "./route/StudentRoute";
import authRoute from "./route/authRoute";
import statsRoute from "./route/statsRoute"
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));

app.use(express.json());
app.use('/api/students', studentRoute);
app.use('/api/auth', authRoute);
app.use('/api/stats', statsRoute);

app.listen(PORT, () => {
  console.log(`App listening to PORT: ${PORT}`);
})
