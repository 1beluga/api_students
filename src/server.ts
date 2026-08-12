import express from "express";
import studentRoute from "./route/StudentRoute"

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/students', studentRoute);

app.listen(PORT, () => {
  console.log("App listening to PORT: ${PORT}");
})
