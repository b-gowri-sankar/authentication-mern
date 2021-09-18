const express = require("express");

const app = express();

app.use(
	express.json({
		extended: false,
	})
);

//middleware
app.use("/api", require("./routes/auth"));

const port = process.env.port || 8000;

app.listen(port, () => {
	console.log(`The server is running on port ${port}`);
});
