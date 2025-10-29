import express from "express";
import db from "../db.js"; 
const router = express.Router();
//GET all books
router.get("/", (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
//POST a new book
router.post("/", (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year)
    return res.status(400).json({ error: "Missing fields" });
  db.query(
    "INSERT INTO books (title, author, year) VALUES (?, ?, ?)",
    [title, author, year],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, title, author, year });
    }
  );
});
//PUT (Update an existing book)
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, author, year } = req.body;
  if (!title || !author || !year)
    return res.status(400).json({ error: "Missing fields" });
  db.query(
    "UPDATE books SET title=?, author=?, year=? WHERE id=?",
    [title, author, year, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Book not found" });
      res.json({ message: "Book updated successfully" });
    }
  );
});
//DELETE route
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM books WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  });
});
export default router; 