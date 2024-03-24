import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { useTranslation } from "react-i18next";

import { Checkbox, OrderedList } from "@/components/atoms";
import { BackButton, Brand } from "@/components/molecules";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";

import { ApplicationScreenProps } from "@/types/navigation";
import { useState } from "react";

function Registration({ navigation }: ApplicationScreenProps) {
  const { t } = useTranslation(["example", "welcome", "common"]);
  const [isAgreed, setIsAgreed] = useState(false);
  const { layout, gutters, fonts, colors, components } = useTheme();

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

        {/** Registration */}
        <View style={[gutters.paddingHorizontal_32]}>
          <View style={[]}>
            <Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>
              {t("common:registration.title")}
            </Text>
          </View>
          <TextInput
            placeholder="full name"
            style={[components.loginInput, gutters.marginTop_12]}
          />
          <TextInput
            placeholder="username"
            style={[components.loginInput, gutters.marginTop_12]}
          />
          <TextInput
            placeholder="password"
            secureTextEntry
            style={[components.loginInput, gutters.marginTop_12]}
          />
        </View>

        {/** Register Button */}
        <View style={[gutters.paddingHorizontal_32]}>
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

export default Registration;
