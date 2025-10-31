import * as Device from 'expo-device';
import * as Application from 'expo-application';

export const getDeviceInfo = async () => {
  const deviceInfo = {
    imei: await Application.getIosIdForVendorAsync() || Device.osBuildId || 'unknown',
    model: Device.modelName,
    os: Device.osName,
    osVersion: Device.osVersion,
  };
  return deviceInfo;
};
