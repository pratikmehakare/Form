const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const route = require('./routes/route')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/v1',route)

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
});
