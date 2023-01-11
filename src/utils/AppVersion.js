import DeviceInfo from 'react-native-device-info';

export const appVersion =
  DeviceInfo.getVersion() + '.' + DeviceInfo.getBuildNumber();
