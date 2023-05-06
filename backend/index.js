import connectToMongo from "./db.js";
import express from "express";
import authRoutes from "./routes/auth.js";
import todosRoutes from "./routes/todos.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

connectToMongo();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.use(cors());
app.use(cors({
  origin: 'https://taskly-backend.onrender.com/'
}));

app.use(cors({
  origin: 'https://taupe-pony-c26ae1.netlify.app/'
}));

app.use(cors({
  origin: 'http://localhost:5000/api/auth/login/'
}));

app.use(cors({
  origin: 'http://localhost:5000/api/auth/createuser'
}));

// AVAILABLE ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/todos", todosRoutes);

app.get("/", (req, res) => {
  res.send("Hello World this is me !");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
