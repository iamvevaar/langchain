import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import translationFR from './locales/fr/translation.json'
import translationEN from './locales/en/translation.json'
import translationES from './locales/es/translation.json'
import translationHi from './locales/hi/translation.json'
import translationBN from './locales/bn/translation.json'
import translationGU from './locales/gu/translation.json'
import translationMR from './locales/mr/translation.json'
import translationKN from './locales/kn/translation.json'
import translationPA from './locales/pa/translation.json'
import translationTA from './locales/ta/translation.json'
import translationTE from './locales/te/translation.json'

const resources = {
    en:{
        translation: translationEN
    },
    fr:{
        translation: translationFR
    },
    es:{
        translation: translationES
    },
    hi:{
        translation: translationHi
    },
    gu:{
        translation: translationGU
    },
    mr:{
        translation: translationMR
    },
    kn:{
        translation:translationKN
    },
    pa:{
        translation: translationPA
    },
    ta:{
        translation : translationTA
    },
    te:{
        translation: translationTE
    },
    bn:{
        translation: translationBN
    }

};
i18n
.use(initReactI18next)
.init({
    resources,
    lng:'en',
    interpolation:{
        escapeValue:false
    }
});

export default i18n