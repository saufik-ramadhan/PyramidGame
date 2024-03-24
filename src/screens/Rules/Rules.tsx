import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useTranslation } from "react-i18next";

import { Checkbox, OrderedList } from "@/components/atoms";
import { BackButton, Brand } from "@/components/molecules";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";

import { ApplicationScreenProps } from "@/types/navigation";
import { useState } from "react";

function Rules({ navigation }: ApplicationScreenProps) {
  const { t } = useTranslation(["example", "welcome", "common"]);
  const [isAgreed, setIsAgreed] = useState(false);
  const { layout, gutters, fonts, colors } = useTheme();

  return (
    <SafeScreen>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[layout.absolute, gutters.margin_24]}
        >
          <BackButton />
        </TouchableOpacity>

        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            gutters.marginTop_24,
          ]}
        >
          <View style={[layout.relative]}>
            <Brand height={100} width={100} />
          </View>
        </View>

        {/** Rules */}
        <View style={[gutters.paddingHorizontal_32]}>
          <View style={[]}>
            <Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>
              {t("common:rules.title")}
            </Text>
          </View>
          <View style={[gutters.marginTop_12]}>
            <OrderedList number="1" value={t("common:rules.1")} />
            <OrderedList number="2" value={t("common:rules.2")} />
            <OrderedList number="3" value={t("common:rules.3")} />
            <OrderedList number="4" value={t("common:rules.4")} />
            <OrderedList number="5" value={t("common:rules.5")} />
            <OrderedList number="6" value={t("common:rules.6")} />
          </View>
        </View>

        <View style={[gutters.paddingHorizontal_32]}>
          {/** Agreement */}
          <TouchableOpacity
            onPress={() => setIsAgreed(!isAgreed)}
            style={[
              gutters.marginTop_32,
              gutters.paddingRight_24,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              },
            ]}
          >
            <Checkbox
              checked={isAgreed}
              onPress={() => setIsAgreed(!isAgreed)}
              style={[gutters.marginRight_12]}
            />
            <Text>{t("common:rules.aggreement")}</Text>
          </TouchableOpacity>

          {/** Register Button */}
          <TouchableOpacity
            testID="login-button"
            onPress={() => navigation.navigate("Registration")}
            disabled={!isAgreed}
            style={[
              gutters.marginTop_24,
              {
                padding: 12,
                borderColor: isAgreed ? colors.white : colors.gray400,
                borderWidth: 3,
                borderBottomWidth: 8,
                borderRadius: 12,
              },
            ]}
          >
            <Text
              style={{
                alignSelf: "center",
                fontWeight: "bold",
                color: isAgreed ? colors.white : colors.gray400,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Rules;
