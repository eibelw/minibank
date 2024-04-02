const express = require("express");
const app = express();
const router = require("./routes/index");
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use(
  cors({
    origin: "http://localhost:5000",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    optionsSuccessStatus: 200,
  })
);

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
