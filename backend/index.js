const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes.js");
app.use("/api/users", userRoutes);

const accountRoutes = require("./routes/accountRoutes.js");
app.use("/api/account", accountRoutes);

require("./db.js").connectDB();

app.get("/", (req, res) => res.send("Good To Go !!"));

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server Running at PORT : ${PORT}`));
