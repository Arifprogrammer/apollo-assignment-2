// getting-started.js
import mongoose from "mongoose";

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
  } catch (error) {
    console.log(error);
  }
}
