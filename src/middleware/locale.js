const LocaleService = require('../services/LocaleService');

const localeMiddleware = (req, res, next) => {
  // Priority: query param > cookie > header > default
  const locale =
    req.query.lang ||
    req.cookies?.lang ||
    LocaleService.parseLanguageHeader(req.headers['accept-language']) ||
    'en';

  // Validate locale
  if (!LocaleService.getAvailableLocales().includes(locale)) {
    req.locale = 'en';
  } else {
    req.locale = locale;
  }

  // Set cookie for persistence
  res.cookie('lang', req.locale, {
    maxAge: 365 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'Lax'
  });

  // Add translation helper
  req.t = (path) => LocaleService.getTranslation(req.locale, path);
  req.translations = LocaleService.getAll(req.locale);

  next();
};

module.exports = { localeMiddleware };