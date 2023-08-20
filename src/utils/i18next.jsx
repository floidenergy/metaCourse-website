import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    supportedLngs: ['en', 'ar', 'fr'],
    fallbackLng:"en",
    detection: {
      order: [ "path", "subdomain", 'localStorage', "cookie", "htmlTag"],
      lookupLocalStorage: 'language', // key name on localStorage
      caches: ['localStorage', "cookie"]
    },
    backend: {
      loadPath: "./assets/locales/{{lng}}/translation.json"
    }
  })