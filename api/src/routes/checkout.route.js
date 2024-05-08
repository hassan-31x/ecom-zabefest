import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2024-04-10",
});

const router = Router();

router.post('/', verifyAuth, async (req, res) => {
    const body = req.body;
    const items = body?.items;
    const shippingPrice = body?.shippingRate?.toFixed(2);
    const transformedItems = items?.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item?.name,
          images : [item?.image || 'https://via.placeholder.com/150'],
        },
        unit_amount: Math.round(item?.price * 100),
      },
      quantity: 1,
    }));

    // Calculate the total amount for the checkout session (you can change this according to your logic)
    const totalAmount = 4000; // $25.00 in cents

    try {
     const params = {
        payment_method_types: ["card"],
        line_items: transformedItems,
        payment_intent_data: {},
        mode: "payment",
        success_url: `${process.env.BASE_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_DOMAIN}`,
      };
      const checkoutSession = await stripe.checkout.sessions.create(params);
      console.log("🚀 ~ router.post ~ checkoutSession:", checkoutSession)

      return res.status(200).json({ id: checkoutSession.id, url: checkoutSession.success_url });
    } catch (err) {
        console.log(err)
        const errorMessage = err instanceof Error ? err.message : "Internal server error";
        return res.status(500).json({ message: errorMessage });
      }
})

router.get('/:id', verifyAuth, async (req, res) => {
    const { id } = req.params;
    try {
      const sessionDetails = await stripe.checkout.sessions.listLineItems(id);
      return res.status(200).json(sessionDetails);
    } catch (err) {
      console.log(err)
      const errorMessage = err instanceof Error ? err.message : "Internal server error";
      return res.status(500).json({ message: errorMessage });
    }
})

export default router;
