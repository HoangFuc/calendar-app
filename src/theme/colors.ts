export const COLORS = {
  primary: '#4A3AFF',
  primaryLight: '#E8E5FF',
  primaryDark: '#3A2AD4',
  secondary: '#6C63FF',
  
  white: '#FFFFFF',
  black: '#1A1A2E',
  
  gray50: '#F8F9FA',
  gray100: '#F1F3F5',
  gray200: '#E9ECEF',
  gray300: '#DEE2E6',
  gray400: '#ADB5BD',
  gray500: '#6C757D',
  gray600: '#495057',
  gray700: '#343A40',
  gray800: '#212529',
  
  blue: '#4A3AFF',
  orange: '#FF8C42',
  green: '#2ECB71',
  pink: '#FF6B8A',
  cyan: '#42C6FF',
  purple: '#9B59B6',
  
  backgroundLight: '#FAFBFF',
  cardBackground: '#FFFFFF',
  
  success: '#2ECB71',
  warning: '#FF8C42',
  error: '#FF4757',
  info: '#42C6FF',
  
  shadow: 'rgba(74, 58, 255, 0.08)',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  semiBold: 'System',
};

export const SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  title: 36,
  
  padding: 16,
  margin: 16,
  radius: 12,
  radiusLg: 16,
  radiusXl: 24,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
};
