import Express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = Express();

app.listen(process.env.PORT, (): void => {
  console.log(`server running on localhost:${process.env.PORT}`);
});
