import express from "express";
import booksRouter from "./routes/books.js";  
import "./db.js";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Book Management API is running" });
});
app.use("/books", booksRouter);
app.listen(3000, () => console.log("Server started on port 3000"));