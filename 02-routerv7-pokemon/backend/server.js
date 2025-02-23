import dotenv from "dotenv";
import app from "./app.js";
const apiUrl = process.env.POKE_API_URL;

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
