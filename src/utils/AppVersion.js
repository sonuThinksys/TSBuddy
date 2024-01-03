import DeviceInfo from 'react-native-device-info';
console.log(
  'DeviceInfo:',
  DeviceInfo.getVersion(),
  typeof Number(DeviceInfo.getBuildNumber()),
);

export const appVersion =
  DeviceInfo.getVersion() + '.' + (Number(DeviceInfo.getBuildNumber()) + 1);
