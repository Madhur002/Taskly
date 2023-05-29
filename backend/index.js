import connectToMongo from "./db.js";
import express from "express";
import authRoutes from "./routes/auth.js";
import todosRoutes from "./routes/todos.js";
import cors from "cors";
import dotenv from "dotenv";
import Todos from "./models/Todos.js";
import fetchuser from "./middleware/fetchuser.js";

dotenv.config();

connectToMongo();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.use(cors());

// AVAILABLE ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/todos", todosRoutes);

app.get("/", (req, res) => {
  res.send("Hello World this is me !");
});

app.get('/search', async (req, res) => {
  const query = req.query.query;

  try {
    const results = await Todos.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Case-insensitive search for title
        { description: { $regex: query, $options: 'i' } }, // Case-insensitive search for description
      ],
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
