import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config();

connectDB()
  .then(() => {
    (app as unknown as NodeJS.EventEmitter).on("error", (error) => {
      console.error("Error in starting the server", error);
      throw error;
    });

    const port = Number(process.env.PORT);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error in connecting to the database");
    throw error;
  });
