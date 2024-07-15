import { ICON } from './importImages';

const SIDE_NAV_OPTIONS = [
  {
    id: 0,
    iconSrc: {
      selected: ICON.accountCheck.default.src.selected,
      noSelected: ICON.accountCheck.default.src.noSelected,
    },
    iconAlt: ICON.accountCheck.default.alt,
    menuTitle: '내 정보',
    linkUrl: '/preview',
  },
  {
    id: 1,
    iconSrc: {
      selected: ICON.textBoxCheck.default.src.selected,
      noSelected: ICON.textBoxCheck.default.src.noSelected,
    },
    iconAlt: ICON.textBoxCheck.default.alt,
    menuTitle: '예약 내역',
    linkUrl: '/my/reservation-history',
  },
  {
    id: 2,
    iconSrc: {
      selected: ICON.setting.default.src.selected,
      noSelected: ICON.setting.default.src.noSelected,
    },
    iconAlt: ICON.setting.default.alt,
    menuTitle: '내 체험 관리',
    linkUrl: '/preview2',
  },
  {
    id: 3,
    iconSrc: {
      seleted: ICON.calendarCheck.default.src.selected,
      noSelected: ICON.calendarCheck.default.src.noSelected,
    },
    iconAlt: ICON.calendar.default.alt,
    menuTitle: '예약 현황',
    linkUrl: '/preview3',
  },
];

export default SIDE_NAV_OPTIONS;
