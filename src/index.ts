// Zero-dependency responsive scaling utility

export interface ScreenSize {
    width: number;
    height: number;
    fontScale?: number;
    pixelRatio?: number;
  }
  
  let screenSize: ScreenSize = {
    width: 390,
    height: 844,
    fontScale: 1,
    pixelRatio: 2,
  };
  
  export const setScreenSize = (size: ScreenSize) => {
    screenSize = { ...screenSize, ...size };
  };
  
  const guidelineBaseWidth = 390;
  const guidelineBaseHeight = 844;
  
  export const scale = (size: number): number => screenSize.width / guidelineBaseWidth * size;
  
  export const verticalScale = (size: number): number => screenSize.height / guidelineBaseHeight * size;
  
  export const moderateScale = (size: number, factor: number = 0.5): number =>
    size + (scale(size) - size) * factor;
  
  export const moderateVerticalScale = (size: number, factor: number = 0.5): number =>
    size + (verticalScale(size) - size) * factor;
  
  export const wp = (percentage: number): number => (percentage * screenSize.width) / 100;
  
  export const hp = (percentage: number): number => (percentage * screenSize.height) / 100;
  
  export const fontScale = (size: number, respectAccessibility: boolean = true): number => {
    const ratio = Math.min(
      screenSize.width / guidelineBaseWidth,
      screenSize.height / guidelineBaseHeight
    );
    const densityAdjustment = screenSize.pixelRatio && screenSize.pixelRatio > 3 ? 0.95 : 1.0;
    let scaledSize = size * ratio * densityAdjustment;
    if (respectAccessibility && screenSize.fontScale) {
      scaledSize *= screenSize.fontScale;
      if (screenSize.fontScale > 1.5) {
        scaledSize = Math.max(scaledSize, 18);
      }
    }
    return Math.round(scaledSize);
  };
  
  export const fontScaleWithLimits = (
    size: number,
    minSize?: number,
    maxSize?: number,
    respectAccessibility: boolean = true
  ): number => {
    let scaled = fontScale(size, respectAccessibility);
    if (minSize !== undefined) scaled = Math.max(scaled, minSize);
    if (maxSize !== undefined) scaled = Math.min(scaled, maxSize);
    return scaled;
  };
  
  export const getDeviceInfo = () => {
    const shortDimension = Math.min(screenSize.width, screenSize.height);
    const longDimension = Math.max(screenSize.width, screenSize.height);
    const aspectRatio = longDimension / shortDimension;
  
    return {
      width: screenSize.width,
      height: screenSize.height,
      shortDimension,
      longDimension,
      isTablet: shortDimension >= 768,
      aspectRatio,
      isTallScreen: aspectRatio > 2.0,
      isExtraTallScreen: aspectRatio > 2.15,
      isCompact: shortDimension < 375,
      isStandard: shortDimension >= 375 && shortDimension < 395,
      isModern: shortDimension >= 395 && shortDimension < 420,
      isLarge: shortDimension >= 420,
    };
  };
  
  export const deviceScale = (
    compact: number,
    standard: number,
    modern: number,
    large: number,
    tablet?: number
  ): number => {
    const info = getDeviceInfo();
    if (info.isTablet && tablet !== undefined) return tablet;
    if (info.isCompact) return compact;
    if (info.isStandard) return standard;
    if (info.isModern) return modern;
    if (info.isLarge) return large;
    return modern;
  };
  