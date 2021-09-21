const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("mongoDB is connected");
	})
	.catch((err) => {
		console.error(err);
	});
app.use(
	express.json({
		extended: false,
	})
);
//app middleware should be on top of routes

app.use(morgan("dev"));
// app.use(cors()); // allows all origins
if (process.env.NODE_ENV === "development") {
	app.use(
		cors({
			origin: `http://localhost:3001`,
		})
	);
}
//middleware
app.use("/api", require("./routes/auth"));

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(
		`The server is running on port ${port} MODE:${process.env.NODE_ENV}`
	);
});
