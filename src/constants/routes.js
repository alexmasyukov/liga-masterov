import { LINKS } from "constants/common"

export const ROUTES = [
  {
    path: LINKS.LOGIN.link,
    exact: true,
    componentName: LINKS.LOGIN.componentName,
    name: 'Логин',
    hidden: true,
    public: true
  },
  {
    path: LINKS.HOME.link,
    componentName: LINKS.HOME.componentName,
    exact: true,
    name: 'Главная',
    menuPosition: 0
  },
  {
    path: LINKS.EDITOR.link,
    exact: true,
    componentName: LINKS.EDITOR.componentName,
    name: 'Прайс-лист',
    menuPosition: 1
  },
  {
    path: LINKS.POCHTA_BANK.link,
    exact: true,
    componentName: LINKS.POCHTA_BANK.componentName,
    name: '«Почта Банк» заявка',
    menuPosition: 2
  },
  {
    path: LINKS.OTP_BANK.link,
    exact: true,
    componentName: LINKS.OTP_BANK.componentName,
    name: '«Банк ОТП» заявка',
    menuPosition: 3
  }
]
