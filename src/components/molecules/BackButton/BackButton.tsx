import {
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useTheme } from "@/theme";
import { isImageSourcePropType } from "@/types/guards/image";
import { ImageVariant } from "@/components/atoms";

import BackBtnLight from "@/theme/assets/images/back-button-icon.png";
import BackBtnDark from "@/theme/assets/images/back-button-icon-dark.png";

type Props = {
  height?: DimensionValue;
  width?: DimensionValue;
  mode?: "contain" | "cover" | "stretch" | "repeat" | "center";
};

export default function BackButton({ height, width, mode }: Props) {
  const { layout } = useTheme();

  if (
    !isImageSourcePropType(BackBtnLight) ||
    !isImageSourcePropType(BackBtnDark)
  ) {
    throw new Error("Image source is not valid");
  }

  return (
    <View testID="brand-img-wrapper" style={{ height, width }}>
      <ImageVariant
        testID="brand-img"
        style={[layout.fullHeight, layout.fullWidth]}
        source={BackBtnLight}
        sourceDark={BackBtnDark}
        resizeMode={mode}
      />
    </View>
  );
}

BackButton.defaultProps = {
  height: 70,
  width: 70,
  mode: "contain",
};

const styles = StyleSheet.create({});
