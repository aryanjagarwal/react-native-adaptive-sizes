"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResponsive = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const responsive_1 = require("../constants/responsive");
const useResponsive = () => {
    const [screenData, setScreenData] = (0, react_1.useState)(() => {
        const { width, height, fontScale, scale: pixelRatio } = react_native_1.Dimensions.get('window');
        return { width, height, fontScale, pixelRatio };
    });
    (0, react_1.useEffect)(() => {
        const subscription = react_native_1.Dimensions.addEventListener('change', ({ window }) => {
            const newScreenSize = {
                width: window.width,
                height: window.height,
                fontScale: window.fontScale,
                pixelRatio: window.scale,
            };
            (0, responsive_1.setScreenSize)(newScreenSize);
            setScreenData(newScreenSize);
        });
        // Set initial screen size
        const { width, height, fontScale, scale: pixelRatio } = react_native_1.Dimensions.get('window');
        const initialSize = { width, height, fontScale, pixelRatio };
        (0, responsive_1.setScreenSize)(initialSize);
        setScreenData(initialSize);
        return () => subscription?.remove();
    }, []);
    const deviceInfo = (0, responsive_1.getDeviceInfo)();
    const platformInfo = (0, responsive_1.getPlatformInfo)();
    return {
        // Screen data
        screenData,
        ...deviceInfo,
        ...platformInfo,
        // Scaling functions
        scale: responsive_1.scale,
        verticalScale: responsive_1.verticalScale,
        moderateScale: responsive_1.moderateScale,
        moderateVerticalScale: responsive_1.moderateVerticalScale,
        wp: responsive_1.wp,
        hp: responsive_1.hp,
        fontScale: responsive_1.fontScale,
        fontScaleWithLimits: responsive_1.fontScaleWithLimits,
        deviceScale: responsive_1.deviceScale,
        platformScale: responsive_1.platformScale,
        // Convenience methods
        scaleFont: (size, respectAccessibility = true) => (0, responsive_1.fontScale)(size, respectAccessibility),
        scaleFontWithLimits: (size, minSize, maxSize, respectAccessibility = true) => (0, responsive_1.fontScaleWithLimits)(size, minSize, maxSize, respectAccessibility),
        scaleByDevice: (compact, standard, modern, large, tablet) => (0, responsive_1.deviceScale)(compact, standard, modern, large, tablet),
        scaleByPlatform: (values) => (0, responsive_1.platformScale)(values),
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
exports.useResponsive = useResponsive;
exports.default = exports.useResponsive;
