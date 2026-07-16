const express = require('express');
const LocaleService = require('../services/LocaleService');

const router = express.Router();

// Get all translations for a locale
router.get('/:locale', (req, res) => {
  const { locale } = req.params;
  const translations = LocaleService.getAll(locale);

  if (!translations) {
    return res.status(404).json({ error: 'Locale not found' });
  }

  res.json({
    locale,
    translations
  });
});

// Get available locales
router.get('/', (req, res) => {
  const locales = LocaleService.getAvailableLocales();
  res.json({
    available: locales,
    count: locales.length
  });
});

// Get specific translation key
router.get('/:locale/:key', (req, res) => {
  const { locale, key } = req.params;
  const translation = LocaleService.getTranslation(locale, key);

  if (!translation) {
    return res.status(404).json({ error: 'Translation not found' });
  }

  res.json({
    locale,
    key,
    value: translation
  });
});

module.exports = router;