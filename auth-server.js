const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/auth", (req, res) => {
  const { merchant_id, partner_code } = req.body;

  if (!merchant_id || !partner_code) {
    return res.status(400).json({ success: false, message: "Missing credentials" });
  }

  // You can validate credentials here from DB or hardcoded
  if (merchant_id === "26290" && partner_code === "MEN.HUB25") {
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
});

app.listen(port, () => {
  console.log(`Auth server running on port ${port}`);
});
