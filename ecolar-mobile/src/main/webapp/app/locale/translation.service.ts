import axios from 'axios';
import VueI18n from 'vue-i18n';

export default class TranslationService {
  public refreshTranslation(i18n: VueI18n, currentLanguage: string, newLanguage: string) {
    currentLanguage = newLanguage ? newLanguage : 'en';
    if (i18n && !i18n.messages[currentLanguage]) {
      i18n.setLocaleMessage(currentLanguage, {});
      axios.get('i18n/' + currentLanguage + '.json').then(res => {
        if (res.data) {
          i18n.setLocaleMessage(currentLanguage, res.data);
          i18n.locale = currentLanguage;
        }
      });
    } else if (i18n) {
      i18n.locale = currentLanguage;
    }
  }
}
