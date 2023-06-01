const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51N9bMuGmMREKNj3Dy3Nv2ZNjUxKCV0ZnTSUhl1VSUdFvOJOg3f6x8vixPsdHmB9hSJV5sRbkKtFd22Dxgell8wmg00GMXPwIBn"
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

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
