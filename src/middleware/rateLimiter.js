const express = require('express');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Trop de requêtes, veuillez réessayer plus tard.'
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Trop de tentatives de connexion, veuillez réessayer plus tard.'
});

const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Trop de requêtes de paiement, veuillez réessayer plus tard.'
});

module.exports = { limiter, authLimiter, paymentLimiter };