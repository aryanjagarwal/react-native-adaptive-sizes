import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import {
  deviceScale,
  fontScale,
  fontScaleWithLimits,
  getDeviceInfo,
  getPlatformInfo,
  hp,
  moderateScale,
  moderateVerticalScale,
  platformScale,
  scale,
  ScreenSize,
  setScreenSize,
  verticalScale,
  wp,
} from '../constants/responsive';

export const useResponsive = () => {
  const [screenData, setScreenData] = useState<ScreenSize>(() => {
    const { width, height, fontScale, scale: pixelRatio } = Dimensions.get('window');
    return { width, height, fontScale, pixelRatio };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      const newScreenSize = {
        width: window.width,
        height: window.height,
        fontScale: window.fontScale,
        pixelRatio: window.scale,
      };
      setScreenSize(newScreenSize);
      setScreenData(newScreenSize);
    });

    // Set initial screen size
    const { width, height, fontScale, scale: pixelRatio } = Dimensions.get('window');
    const initialSize = { width, height, fontScale, pixelRatio };
    setScreenSize(initialSize);
    setScreenData(initialSize);

    return () => subscription?.remove();
  }, []);

  const deviceInfo = getDeviceInfo();
  const platformInfo = getPlatformInfo();

  return {
    // Screen data
    screenData,
    ...deviceInfo,
    ...platformInfo,

    // Scaling functions
    scale,
    verticalScale,
    moderateScale,
    moderateVerticalScale,
    wp,
    hp,
    fontScale,
    fontScaleWithLimits,
    deviceScale,
    platformScale,

    // Convenience methods
    scaleFont: (size: number, respectAccessibility = true) =>
      fontScale(size, respectAccessibility),

    scaleFontWithLimits: (
      size: number,
      minSize?: number,
      maxSize?: number,
      respectAccessibility = true
    ) => fontScaleWithLimits(size, minSize, maxSize, respectAccessibility),

    scaleByDevice: (
      compact: number,
      standard: number,
      modern: number,
      large: number,
      tablet?: number
    ) => deviceScale(compact, standard, modern, large, tablet),

    scaleByPlatform: <T>(values: { ios?: T; android?: T; web?: T; default: T }) =>
      platformScale(values),

    // Responsive breakpoint helpers
    isSmallScreen: deviceInfo.isCompact,
    isMediumScreen: deviceInfo.isStandard || deviceInfo.isModern,
    isLargeScreen: deviceInfo.isLarge,
    isTabletScreen: deviceInfo.isTablet,

    // Platform helpers
    isIOS: platformInfo.isIOS,
    isAndroid: platformInfo.isAndroid,
    isWeb: platformInfo.isWeb,
  };
};

export default useResponsive;
