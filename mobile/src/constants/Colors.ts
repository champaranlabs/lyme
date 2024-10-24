/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  heighLight: {
    darkest: '#51563F',
    // dark:,
    // medium:,
    // light:,
    lightest: '#E9F6DC'
  },
  neutral: {
    light: {
      darkest: '#C5C6CC',
      lightest: '#FFFFFF'
    },
    dark: {
      darkest: '#1F2024',
      dark: '#2F3036',
      light: '#71727A',
      lightest: '#8F9098'
    }
  },
  support: {
    error: {
      dark: '#ED3241'
    }
  },
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  facebook: '#3B5998',
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
