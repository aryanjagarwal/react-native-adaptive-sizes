"use strict";
// Zero-dependency responsive scaling utility
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceScale = exports.getDeviceInfo = exports.fontScaleWithLimits = exports.fontScale = exports.hp = exports.wp = exports.moderateVerticalScale = exports.moderateScale = exports.verticalScale = exports.scale = exports.setScreenSize = void 0;
let screenSize = {
    width: 390,
    height: 844,
    fontScale: 1,
    pixelRatio: 2,
};
const setScreenSize = (size) => {
    screenSize = { ...screenSize, ...size };
};
exports.setScreenSize = setScreenSize;
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;
const scale = (size) => screenSize.width / guidelineBaseWidth * size;
exports.scale = scale;
const verticalScale = (size) => screenSize.height / guidelineBaseHeight * size;
exports.verticalScale = verticalScale;
const moderateScale = (size, factor = 0.5) => size + ((0, exports.scale)(size) - size) * factor;
exports.moderateScale = moderateScale;
const moderateVerticalScale = (size, factor = 0.5) => size + ((0, exports.verticalScale)(size) - size) * factor;
exports.moderateVerticalScale = moderateVerticalScale;
const wp = (percentage) => (percentage * screenSize.width) / 100;
exports.wp = wp;
const hp = (percentage) => (percentage * screenSize.height) / 100;
exports.hp = hp;
const fontScale = (size, respectAccessibility = true) => {
    const ratio = Math.min(screenSize.width / guidelineBaseWidth, screenSize.height / guidelineBaseHeight);
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
exports.fontScale = fontScale;
const fontScaleWithLimits = (size, minSize, maxSize, respectAccessibility = true) => {
    let scaled = (0, exports.fontScale)(size, respectAccessibility);
    if (minSize !== undefined)
        scaled = Math.max(scaled, minSize);
    if (maxSize !== undefined)
        scaled = Math.min(scaled, maxSize);
    return scaled;
};
exports.fontScaleWithLimits = fontScaleWithLimits;
const getDeviceInfo = () => {
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
exports.getDeviceInfo = getDeviceInfo;
const deviceScale = (compact, standard, modern, large, tablet) => {
    const info = (0, exports.getDeviceInfo)();
    if (info.isTablet && tablet !== undefined)
        return tablet;
    if (info.isCompact)
        return compact;
    if (info.isStandard)
        return standard;
    if (info.isModern)
        return modern;
    if (info.isLarge)
        return large;
    return modern;
};
exports.deviceScale = deviceScale;
