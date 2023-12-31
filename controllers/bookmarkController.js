const express = require("express");
const bookmarks = express.Router();
const { 
  getAllBookmarks, 
  getBookmark, 
  createBookmark, 
  deleteBookmark,
  updateBookmark,
} = require("../queries/bookmarks");
const { 
  checkName,
  checkBoolean
 } = require("../validations/checkBookmarks.js");

// INDEX ================
bookmarks.get("/", async (req, res) => {
  const allBookmarks = await getAllBookmarks();
  if (allBookmarks[0]) {
    res.status(200).json(allBookmarks);
  } else {
    res.status(500).json({ error: "server error" });
  }
});


// SHOW ================
bookmarks.get("/:id", async (req, res) => {
  const { id } = req.params;
  // SAME AS: const id = req.params.id;
  const bookmark = await getBookmark(id);
  if (bookmark) {
    res.json(bookmark);
  } else {
    res.status(404).json({ error: "not found" });
  }
});


// CREATE ================
bookmarks.post("/", checkBoolean, checkName, async (req, res) => {
  try {
    const bookmark = await createBookmark(req.body);
    res.json(bookmark);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});


// ========= DELETE ================
bookmarks.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBookmark = await deleteBookmark(id);
  if (deletedBookmark.id) {
    res.status(200).json(deletedBookmark);
  } else {
    res.status(404).json.apply("Bookmark not found");
  }
});


// UPDATE  ================
bookmarks.put("/:id", checkName, checkBoolean, async (req, res) => {
  const { id } = req.params;
  const updatedBookmark = await updateBookmark(id, req.body); 
  res.status(200).json(updatedBookmark);
})

module.exports = bookmarks;

