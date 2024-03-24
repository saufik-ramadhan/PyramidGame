import {
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React from "react";
import ImageVariant from "../ImageVariant/ImageVariant";
import { useTheme } from "@/theme";

import CheckboxLight from "@/theme/assets/images/check-icon.png";
import CheckboxDark from "@/theme/assets/images/check-icon.png";

type Props = TouchableOpacityProps & {
  checked: boolean;
  height?: DimensionValue;
  width?: DimensionValue;
  mode?: "contain" | "cover" | "stretch" | "repeat" | "center";
};

function Checkbox({ checked, height, width, mode, style, onPress }: Props) {
  const { layout, backgrounds, gutters, colors } = useTheme();
  return (
    <TouchableOpacity
      testID="checkbox-img-wrapper"
      style={[
        style,
        {
          height,
          width,
          backgroundColor: checked ? colors.purple500 : colors.gray200,
          borderRadius: 8,
        },
      ]}
      onPress={onPress}
    >
      {!checked ? (
        <></>
      ) : (
        <ImageVariant
          testID="checkbox-img"
          style={[layout.fullHeight, layout.fullWidth]}
          source={CheckboxLight}
          sourceDark={CheckboxDark}
          resizeMode={mode}
        />
      )}
    </TouchableOpacity>
  );
}

Checkbox.defaultProps = {
  height: 24,
  width: 24,
  mode: "contain",
};

const styles = StyleSheet.create({});

export default Checkbox;
