export interface ScreenSize {
    width: number;
    height: number;
    fontScale?: number;
    pixelRatio?: number;
}
export declare const setScreenSize: (size: ScreenSize) => void;
export declare const scale: (size: number) => number;
export declare const verticalScale: (size: number) => number;
export declare const moderateScale: (size: number, factor?: number) => number;
export declare const moderateVerticalScale: (size: number, factor?: number) => number;
export declare const wp: (percentage: number) => number;
export declare const hp: (percentage: number) => number;
export declare const fontScale: (size: number, respectAccessibility?: boolean) => number;
export declare const fontScaleWithLimits: (size: number, minSize?: number, maxSize?: number, respectAccessibility?: boolean) => number;
export declare const getDeviceInfo: () => {
    width: number;
    height: number;
    shortDimension: number;
    longDimension: number;
    isTablet: boolean;
    aspectRatio: number;
    isTallScreen: boolean;
    isExtraTallScreen: boolean;
    isCompact: boolean;
    isStandard: boolean;
    isModern: boolean;
    isLarge: boolean;
};
export declare const deviceScale: (compact: number, standard: number, modern: number, large: number, tablet?: number) => number;
