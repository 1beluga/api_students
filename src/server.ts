import express from "express";
import studentRoute from "./route/StudentRoute";
import authRoute from "./route/authRoute";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/students', studentRoute);
app.use('/api/auth', authRoute)

app.listen(PORT, () => {
  console.log(`App listening to PORT: ${PORT}`);
})
