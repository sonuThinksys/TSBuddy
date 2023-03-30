import {MonthImages} from 'assets/monthImage/MonthImage';
// const monthArray=[{january:{monthImage:MonthImages.janImage,monthIcon:MonthImages.janIcon},
//    // january:{monthImage:MonthImages.janImage,monthIcon:MonthImages.janIcon}
// }]
const monthImages = {
  1: {
    monthImage: MonthImages.janImage,
    monthIcon: MonthImages.janIcon,
    monthName: 'January',
  },
  2: {
    monthImage: MonthImages.febImage,
    monthIcon: MonthImages.febIcon,
    monthName: 'February',
  },
  3: {
    monthImage: MonthImages.marchImage,
    monthIcon: MonthImages.marchIcon,
    monthName: 'March',
  },
  4: {
    monthImage: MonthImages.aprilImage,
    monthIcon: MonthImages.aprilIcon,
    monthName: 'April',
  },
  5: {
    monthImage: MonthImages.mayImage,
    monthIcon: MonthImages.aprilIcon,
    monthName: 'May',
  },
  6: {
    monthImage: MonthImages.junImage,
    monthIcon: MonthImages.junIcon,
    monthName: 'June',
  },
  7: {
    monthImage: MonthImages.julyImage,
    monthIcon: MonthImages.julyIcon,
    monthName: 'Jully',
  },
  8: {
    monthImage: MonthImages.augImage,
    monthIcon: MonthImages.augIcon,
    monthName: 'August',
  },
  9: {
    monthImage: MonthImages.sepImage,
    monthIcon: MonthImages.sepIcon,
    monthName: 'September',
  },
  10: {
    monthImage: MonthImages.octImage,
    monthIcon: MonthImages.octIcon,
    monthName: 'October',
  },
  11: {
    monthImage: MonthImages.novImage,
    monthIcon: MonthImages.novIcon,
    monthName: 'November',
  },
  12: {
    monthImage: MonthImages.decImage,
    monthIcon: MonthImages.decIcon,
    monthName: 'December',
  },
};

const attendenceMonthImages = {
  1: MonthImages.janImage,
  2: MonthImages.febImage,
  3: MonthImages.marchImage,
  4: MonthImages.aprilImage,
  5: MonthImages.mayImage,
  6: MonthImages.junImage,
  7: MonthImages.julyImage,
  8: MonthImages.augImage,
  9: MonthImages.sepImage,
  10: MonthImages.octImage,
  11: MonthImages.novImage,
  12: MonthImages.decImage,
};

export {monthImages, attendenceMonthImages};
