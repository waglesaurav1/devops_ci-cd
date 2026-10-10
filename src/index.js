
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "DevOps CI/CD project is running!",
    status: "success"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
