export const COLUMN_TYPES = {
  ID: 'ID',
  CATEGORY_ID: 'CATEGORY_ID',
  HIDDEN: 'HIDDEN',
  CHECK: 'CHECK',
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  LABEL: 'LABEL',
  TEXT: 'TEXT',
  IMAGES: 'IMAGES'
}

export const INPUT_TYPES = {
  TEXTAREA: 'TEXTAREA',
  INPUT: 'INPUT'
}

export const PAGES_COMPONENT_NAMES = {
  LOGIN_PAGE: 'LoginPage',
  HOME_PAGE: 'HomePage',
  EDITOR_PAGE: 'EditorPage',
  POCHTA_BANK_PAGE: 'PochtaBankPage',
  OTP_BANK_PAGE: 'OtpBankPage',
  NOT_FOUND_PAGE: 'NotFoundPage'
}

export const LINKS = {
  LOGIN: {
    link: '/cms/price-app/build/login',
    componentName: PAGES_COMPONENT_NAMES.LOGIN_PAGE
  },
  HOME: {
    link: '/cms/price-app/build',
    componentName: PAGES_COMPONENT_NAMES.HOME_PAGE
  },
  EDITOR: {
    link: '/cms/price-app/build/price-editor',
    componentName: PAGES_COMPONENT_NAMES.EDITOR_PAGE
  },
  POCHTA_BANK: {
    link: '/cms/price-app/build/pochta-bank',
    componentName: PAGES_COMPONENT_NAMES.POCHTA_BANK_PAGE
  },
  OTP_BANK: {
    link: '/cms/price-app/build/otp-bank',
    componentName: PAGES_COMPONENT_NAMES.OTP_BANK_PAGE
  },
  NOT_FOUND: {
    link: '/cms/price-app/build/404',
    componentName: PAGES_COMPONENT_NAMES.NOT_FOUND_PAGE
  }
}