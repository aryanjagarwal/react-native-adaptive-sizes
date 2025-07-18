# React-Native-Adaptive-Sizes

A lightweight and dependency-free utility library for responsive scaling of UI elements including width, height, and font sizes.

## Features

- No dependencies
- Width & height scaling
- Font scaling with accessibility awareness
- Device categorization helpers

## Installation

```bash
npm install react-native-adaptive-sizes
```

## Usage

First, set your screen dimensions (typically done once at app startup):

```javascript
import { setScreenSize } from "react-native-adaptive-sizes";
import { Dimensions } from "react-native";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");
const { fontScale } = Dimensions.get("screen");

// Set the screen size for the scaling utilities
setScreenSize({ width, height, fontScale });
```

### Basic Scaling

```javascript
import {
  scale,
  verticalScale,
  moderateScale,
} from "react-native-adaptive-sizes";

// Use in your styles
const styles = {
  container: {
    padding: scale(16),
    marginBottom: verticalScale(20),
    borderRadius: moderateScale(8),
  },
};
```

### Percentage-Based Sizing

```javascript
import { wp, hp } from "react-native-adaptive-sizes";

const styles = {
  banner: {
    width: wp(90), // 90% of screen width
    height: hp(20), // 20% of screen height
  },
};
```

### Font Scaling

```javascript
import { fontScale, fontScaleWithLimits } from "react-native-adaptive-sizes";

const styles = {
  title: {
    fontSize: fontScale(24),
  },
  subtitle: {
    // Min 16, max 22, respects system accessibility settings
    fontSize: fontScaleWithLimits(18, 16, 22, true),
  },
};
```

### Device Detection

```javascript
import { getDeviceInfo, deviceScale } from "react-native-adaptive-sizes";

// Get device information
const deviceInfo = getDeviceInfo();
if (deviceInfo.isTablet) {
  // Use tablet-specific layout
}

// Different values based on device size
const padding = deviceScale(
  10, // compact devices (< 375)
  12, // standard devices (375-394)
  14, // modern devices (395-419)
  16, // large devices (≥ 420)
  20 // tablets (optional)
);
```

## API Reference

### Core Functions

- `setScreenSize(size: ScreenSize)`: Sets the screen dimensions for scaling calculations
- `scale(size: number)`: Scales a value horizontally based on screen width
- `verticalScale(size: number)`: Scales a value vertically based on screen height
- `moderateScale(size: number, factor?: number)`: Scales with a moderation factor (default: 0.5)
- `moderateVerticalScale(size: number, factor?: number)`: Vertical scaling with moderation factor

### Percentage Helpers

- `wp(percentage: number)`: Returns the given percentage of screen width
- `hp(percentage: number)`: Returns the given percentage of screen height

### Font Scaling

- `fontScale(size: number, respectAccessibility?: boolean)`: Scales font size with accessibility support
- `fontScaleWithLimits(size: number, minSize?: number, maxSize?: number, respectAccessibility?: boolean)`: Font scaling with min/max constraints

### Device Information

- `getDeviceInfo()`: Returns object with device size information and categorization
- `deviceScale(compact: number, standard: number, modern: number, large: number, tablet?: number)`: Returns appropriate value based on device category
