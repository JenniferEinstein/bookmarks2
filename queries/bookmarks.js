const db = require("../db/dbConfig.js");


// ALL BOOKMARKS
const getAllBookmarks = async () => {
    try {
        const allBookmarks = await db.any("SELECT * FROM bookmarks");
        return allBookmarks;
      } catch (error) {
        return error;
      }
};


// db.any is returning a promise. the AWAIT here is saying to wait and don't return anything until all promises are resolved.


// ONE Bookmark

const getBookmark = async (id) => {
    try {
      const oneBookmark = await db.one("SELECT * FROM bookmarks WHERE id=$1", id);
      return oneBookmark;
    } catch (error) {
      return error;
    }
};



//CREATE NEW BOOKMARK/s


const createBookmark = async (bookmark) => {
    try {
      const newBookmark = await db.one(
        "INSERT INTO bookmarks (name, url, category, is_favorite) VALUES($1, $2, $3, $4) RETURNING *",
        [bookmark.name, bookmark.url, bookmark.category, bookmark.is_favorite]
      );
      return newBookmark;
    } catch (error) {
      return error;
    }
  };



module.exports = {
getAllBookmarks,
createBookmark,
getBookmark,
};


// Note: with module.exports, we are returning an object because we will return more than one function. Therefore, we will store it in an object.

/* Earlier code that has been replaced:
    module.exports = { getAllBookmarks };


*/