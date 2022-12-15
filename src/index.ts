// ENV
import * as dotenv from "dotenv";
dotenv.config();

// APP
import app from "./app";

app.listen(process.env.APP_PORT, () => {
  console.log(`App listening on port ${process.env.APP_PORT}`);
});
