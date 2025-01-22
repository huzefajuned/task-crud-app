const mongoose = require("mongoose");
const DB_URI = process.env.MONGODB_URI;
console.log('DB_URI in connection',DB_URI)

export const db = mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error: any) => {
    console.error("Error connecting to MongoDB:", error);
  });
