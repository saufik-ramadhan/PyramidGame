import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import type { ComponentTheme } from "@/types/theme/theme";

export default ({ layout, backgrounds, fonts, colors }: ComponentTheme) => {
  return {
    buttonCircle: {
      ...layout.justifyCenter,
      ...layout.itemsCenter,
      ...backgrounds.purple100,
      ...fonts.gray400,
      height: 70,
      width: 70,
      borderRadius: 35,
    },
    circle250: {
      borderRadius: 140,
      height: 250,
      width: 250,
    },
    loginInput: {
      borderColor: colors.white,
      borderWidth: 2,
      borderRadius: 12,
      padding: 12,
    },
    loginButton: {
      borderRadius: 12,
      padding: 12,
    },
  } as const satisfies Record<string, ImageStyle | TextStyle | ViewStyle>;
};
