const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

// Create subscription
router.post('/subscribe', async (req, res) => {
  try {
    const { plan, paymentMethodId } = req.body;
    const userId = req.user.id;

    const plans = {
      free: { amount: 0 },
      pro: { amount: 900, interval: 'month' },
      enterprise: { amount: 4900, interval: 'month' }
    };

    if (!plans[plan]) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    if (plan === 'free') {
      // Free plan - no payment needed
      return res.json({ message: 'Free plan activated' });
    }

    // Create payment intent for Pro/Enterprise
    const paymentIntent = await stripe.paymentIntents.create({
      amount: plans[plan].amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      metadata: {
        userId,
        plan
      }
    });

    res.json({
      message: 'Subscription created',
      paymentIntent
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Subscription failed' });
  }
});

// Get invoice history
router.get('/invoices', async (req, res) => {
  try {
    const userId = req.user.id;

    // In production, fetch from database where invoices are stored
    res.json({
      message: 'Invoice history retrieved',
      invoices: []
    });
  } catch (error) {
    console.error('Invoice error:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// Webhook for Stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object);
        // Update user subscription in database
        break;
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object);
        break;
      default:
        console.log('Unhandled event type:', event.type);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: 'Webhook failed' });
  }
});

module.exports = router;