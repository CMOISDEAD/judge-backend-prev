import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";

const app = express();

// middleware
app.use(cors());
app.use(morgan("combined"));
app.use(express.json({ extended: true, limit: "1mb" }));

// routes
app.use("/", routes);

// serve
app.listen(8080, () => {
  console.log("server is running on port 8080");
});
