import React, { ReactNode } from 'react';
import { useResponsive } from '../hooks/useResponsive';
type ResponsiveContextType = ReturnType<typeof useResponsive>;
declare const ResponsiveContext: React.Context<{
    scale: (size: number) => number;
    verticalScale: (size: number) => number;
    moderateScale: (size: number, factor?: number) => number;
    moderateVerticalScale: (size: number, factor?: number) => number;
    wp: (percentage: number) => number;
    hp: (percentage: number) => number;
    fontScale: (size: number, respectAccessibility?: boolean) => number;
    fontScaleWithLimits: (size: number, minSize?: number, maxSize?: number, respectAccessibility?: boolean) => number;
    deviceScale: (compact: number, standard: number, modern: number, large: number, tablet?: number) => number;
    platformScale: <T>(values: {
        ios?: T;
        android?: T;
        web?: T;
        default: T;
    }) => T;
    scaleFont: (size: number, respectAccessibility?: boolean) => number;
    scaleFontWithLimits: (size: number, minSize?: number, maxSize?: number, respectAccessibility?: boolean) => number;
    scaleByDevice: (compact: number, standard: number, modern: number, large: number, tablet?: number) => number;
    scaleByPlatform: <T>(values: {
        ios?: T;
        android?: T;
        web?: T;
        default: T;
    }) => T;
    isSmallScreen: boolean;
    isMediumScreen: boolean;
    isLargeScreen: boolean;
    isTabletScreen: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    isWeb: boolean;
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
    screenData: import("..").ScreenSize;
} | undefined>;
interface ResponsiveProviderProps {
    children: ReactNode;
}
export declare const ResponsiveProvider: React.FC<ResponsiveProviderProps>;
export declare const useResponsiveContext: () => ResponsiveContextType;
export { ResponsiveContext };
export default ResponsiveProvider;
