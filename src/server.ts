import express from "express";
import studentsRoute from "./route/studentsRoute"

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/students', studentsRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
