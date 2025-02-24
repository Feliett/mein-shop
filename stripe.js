const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("DEIN_STRIPE_SECRET_KEY");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card", "klarna"],
        line_items: [{
            price_data: {
                currency: "eur",
                product_data: { name: "Produkt" },
                unit_amount: 2000, // Preis in Cent (20€)
            },
            quantity: 1,
        }],
        mode: "payment",
        success_url: "https://deine-seite.de/success",
        cancel_url: "https://deine-seite.de/cancel",
    });

    res.json({ id: session.id });
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
