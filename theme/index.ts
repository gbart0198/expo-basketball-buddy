import { Dimensions, Platform, StyleSheet } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const COLORS = {
  background: "#121212",
  primaryAccent: "#FF6F00",
  secondaryAccent: "#1E88E5",
  success: "#00C853",
  error: "#E53935",
  textPrimary: "#FFFFFF",
  textSecondary: "#B0BEC5",
  transparent: "transparent",
  overlay: "rgba(0, 0, 0, 0.5)",
  cardBackground: "#1E1E1E",
  inputBackground: "#2C2C2C",
  borderColor: "#333333",
};

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  xxxl: 36,
};

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 999, // For circular elements
};

export const createShadow = (elevation = 2) => {
  return Platform.select({
    ios: {
      shadowColor: COLORS.background,
      shadowOffset: { width: 0, height: elevation },
      shadowOpacity: 0.3,
      shadowRadius: elevation * 2,
    },
    android: {
      elevation: elevation,
    },
  });
};

export const COMMON_STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...createShadow(3),
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.primaryAccent,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: "center",
    justifyContent: "center",
    ...createShadow(2),
  },
  buttonText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.md,
    fontWeight: 600,
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.md,
  },
  header: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 700,
    color: COLORS.textPrimary,
    marginVertical: SPACING.md,
  },
  subheader: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 600,
    color: COLORS.textPrimary,
    marginVertical: SPACING.sm,
  },
  bodyText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
  },
  secondaryText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
});

export const isSmallDevice = SCREEN_WIDTH < 375;
export const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 768;
export const isLargeDevice = SCREEN_WIDTH >= 768;

export const getResponsiveSize = (size: number): number => {
  if (isSmallDevice) return size * 0.9;
  if (isLargeDevice) return size * 1.2;
  return size;
};

export const getResponsiveSpacing = (
  spacingKey: keyof typeof SPACING,
): number => {
  const baseSpacing = SPACING[spacingKey];
  return getResponsiveSize(baseSpacing);
};

export const getResponsiveFontSize = (
  fontSizeKey: keyof typeof FONT_SIZE,
): number => {
  const baseFontSize = FONT_SIZE[fontSizeKey];
  return getResponsiveSize(baseFontSize);
};
