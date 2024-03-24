import { View, Text } from "react-native";
import React from "react";

type Props = {
  number: string;
  value: string;
};

export default function OrderedList({ number, value }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        paddingRight: 20,
      }}
    >
      <Text style={{ marginRight: number === "1" ? 10 : 8, fontSize: 12 }}>
        {number}.
      </Text>
      <Text style={{ flexWrap: "wrap" }} numberOfLines={0}>
        {value}
      </Text>
    </View>
  );
}
