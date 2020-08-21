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
  POCHTA_BANK_PAGE: 'PochtaBankPage'
}

export const LINKS = {
  LOGIN: {
    link: '/',
    componentName: PAGES_COMPONENT_NAMES.LOGIN_PAGE
  },
  HOME: {
    link: '/home',
    componentName: PAGES_COMPONENT_NAMES.HOME_PAGE
  },
  EDITOR: {
    link: '/price-editor',
    componentName: PAGES_COMPONENT_NAMES.EDITOR_PAGE
  },
  POCHTA_BANK: {
    link: '/pochta-bank',
    componentName: PAGES_COMPONENT_NAMES.POCHTA_BANK_PAGE
  }
}