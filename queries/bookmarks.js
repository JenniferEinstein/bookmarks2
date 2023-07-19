const db = require("../db/dbConfig.js");

const getAllBookmarks = async () => {
    try {
        const allBookmarks = await db.any("SELECT * FROM bookmarks");
        return allBookmarks;
      } catch (error) {
        return error;
      }
};


// db.any is returning a promise. the AWAIT here is saying to wait and don't return anything until all promises are resolved.

module.exports = { getAllBookmarks };

// Note: with module.exports, we are returning an object because we will return more than one function. Therefore, we will store it in an object.