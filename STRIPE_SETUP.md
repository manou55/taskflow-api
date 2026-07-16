# Stripe Integration Setup

## Prerequisites
- Stripe account (https://stripe.com)
- Node.js and npm installed

## Step 1: Get Stripe API Keys

1. Sign up or log in to your Stripe dashboard
2. Navigate to **Developers** → **API Keys**
3. Copy:
   - **Publishable Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`)

## Step 2: Configure Environment Variables

Update your `.env` file:

```env
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PUBLIC_KEY=pk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## Step 3: Setup Webhooks

1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter your endpoint URL:
   ```
   https://yourdomain.com/api/v1/payments/webhook
   ```
4. Select events to listen:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

5. Copy the **Signing Secret** and add to `.env`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

## Step 4: Testing with Stripe CLI

### Install Stripe CLI
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Linux
curl https://files.stripe.com/stripe-cli/install.sh -o install.sh
sudo bash install.sh

# Windows
choco install stripe
```

### Login and Forward Webhooks
```bash
stripe login
stripe listen --forward-to localhost:3000/api/v1/payments/webhook
```

## Step 5: Test Payments

### Test Card Numbers

| Scenario | Card Number | Expiry | CVC |
|----------|------------|--------|-----|
| Success | 4242 4242 4242 4242 | Any future date | Any 3 digits |
| Decline | 4000 0000 0000 0002 | Any future date | Any 3 digits |
| Authentication Required | 4000 0025 0000 3155 | Any future date | Any 3 digits |

### Create Test Payment
```bash
curl -X POST http://localhost:3000/api/v1/payments/subscribe \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "plan": "pro",
    "paymentMethodId": "pm_card_visa"
  }'
```

## Step 6: Production Deployment

### Before Going Live
1. Replace test keys with live keys in production `.env`
2. Update your webhook endpoint to your production URL
3. Enable HTTPS for your webhook endpoint
4. Test with real test card numbers from Stripe
5. Review your pricing and refund policies

### Update Environment
```env
STRIPE_SECRET_KEY=sk_live_your_live_key_here
STRIPE_PUBLIC_KEY=pk_live_your_live_key_here
```

## Pricing Plans Configuration

Update your subscription plans in the payments route:

```javascript
const plans = {
  free: { amount: 0 },
  pro: { amount: 900, interval: 'month' }, // $9/month
  enterprise: { amount: 4900, interval: 'month' } // $49/month
};
```

## Useful Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe CLI Documentation](https://stripe.com/docs/stripe-cli)
- [Testing Guide](https://stripe.com/docs/testing)