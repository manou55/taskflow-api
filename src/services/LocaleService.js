const translations = require('./translations.json');

class LocaleService {
  static getTranslation(locale, path) {
    const keys = path.split('.');
    let value = translations[locale];

    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key];
      } else {
        return null;
      }
    }

    return value || translations['en'][path.split('.')[0]];
  }

  static getAll(locale = 'en') {
    return translations[locale] || translations['en'];
  }

  static getAvailableLocales() {
    return Object.keys(translations);
  }

  static parseLanguageHeader(acceptLanguage) {
    if (!acceptLanguage) return 'en';

    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const parts = lang.trim().split(';');
        const locale = parts[0].split('-')[0];
        const quality = parts[1] ? parseFloat(parts[1].split('=')[1]) : 1;
        return { locale, quality };
      })
      .sort((a, b) => b.quality - a.quality);

    const availableLocales = this.getAvailableLocales();
    const preferred = languages.find(lang => availableLocales.includes(lang.locale));

    return preferred ? preferred.locale : 'en';
  }
}

module.exports = LocaleService;