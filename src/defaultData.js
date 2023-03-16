import {MonthImages} from 'assets/monthImage/MonthImage';
// const monthArray=[{january:{monthImage:MonthImages.janImage,monthIcon:MonthImages.janIcon},
//    // january:{monthImage:MonthImages.janImage,monthIcon:MonthImages.janIcon}
// }]
const monthImages = {
  january: {monthImage: MonthImages.janImage, monthIcon: MonthImages.janIcon},
  february: {monthImage: MonthImages.febImage, monthIcon: MonthImages.febIcon},
  march: {monthImage: MonthImages.marchImage, monthIcon: MonthImages.marchIcon},
  april: {monthImage: MonthImages.aprilImage, monthIcon: MonthImages.aprilIcon},
  may: {monthImage: MonthImages.mayImage, monthIcon: MonthImages.aprilIcon},
  june: {monthImage: MonthImages.junImage, monthIcon: MonthImages.junIcon},
  jully: {monthImage: MonthImages.julyImage, monthIcon: MonthImages.julyIcon},
  august: {monthImage: MonthImages.augImage, monthIcon: MonthImages.augIcon},
  september: {monthImage: MonthImages.sepImage, monthIcon: MonthImages.sepIcon},
  ctober: {monthImage: MonthImages.octImage, monthIcon: MonthImages.octIcon},
  november: {monthImage: MonthImages.novImage, monthIcon: MonthImages.novIcon},
  december: {monthImage: MonthImages.decImage, monthIcon: MonthImages.decIcon},
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
