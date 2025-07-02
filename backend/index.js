require("dotenv").config();
const express = require("express");
const cors = require("cors");
const reportRoutes = require("./src/api/report.routes");
const { startKeepAlive } = require("./src/utils/keepAlive");

const app = express();
const port = process.env.PORT || 5001;

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", reportRoutes);

app.get("/", (req, res) => {
  res.send("Korai Health Backend is running!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

  startKeepAlive();
});
