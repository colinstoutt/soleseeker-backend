const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51N6NSNBHwh3HtUU8qSntq0HSPQroZECOolfFfIUrrs4lLCotURfPGHO77cMz68XAjCbqaX5U7pmmPuz9g5CvacHg003UFVOq3J"
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(3001, () => console.log("listening on PORT 3001..."));
