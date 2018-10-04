import englishMessages from './i18n/en'
import chineseMessages from './i18n/cn'

const asyncMessages = {
  cn: chineseMessages,
}

export default locale => {
  if (locale === 'cn') {
    return asyncMessages[locale]
  }

  // Always fallback on english
  return englishMessages
}
