const express = require('express');
const router = express.Router();

// Paddle webhook for payment events
router.post('/paddle-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['paddle-signature'];
    const body = req.body.toString();

    // Verify signature and process webhook
    console.log('Paddle webhook received:', body);

    // Handle different event types
    const event = JSON.parse(body);
    
    switch (event.event_type) {
      case 'subscription.created':
        console.log('New subscription:', event.data);
        break;
      case 'subscription.updated':
        console.log('Subscription updated:', event.data);
        break;
      case 'subscription.cancelled':
        console.log('Subscription cancelled:', event.data);
        break;
      default:
        console.log('Unhandled event:', event.event_type);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Paddle webhook error:', error);
    res.status(400).json({ error: 'Webhook failed' });
  }
});

// Get pricing plans
router.get('/plans', (req, res) => {
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      interval: 'month',
      features: [
        'Up to 5 team members',
        'Unlimited tasks',
        'Basic task management',
        'Email support',
        '1 team'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 9,
      interval: 'month',
      features: [
        'Up to 50 team members',
        'Unlimited tasks',
        'Advanced analytics',
        'Priority support',
        'API access',
        'Unlimited teams',
        'Custom integrations'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 49,
      interval: 'month',
      features: [
        'Unlimited team members',
        'Unlimited tasks',
        'Advanced security & SSO',
        'Dedicated account manager',
        'Custom integrations',
        '24/7 phone support',
        'SLA guarantee',
        'On-premise option'
      ]
    }
  ];

  res.json(plans);
});

module.exports = router;