import { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Button,
} from "react-native";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import { ImageVariant } from "@/components/atoms";
import { Brand } from "@/components/molecules";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { fetchOne } from "@/services/users";

import { isImageSourcePropType } from "@/types/guards/image";

import SendImage from "@/theme/assets/images/send.png";
import ColorsWatchImage from "@/theme/assets/images/colorswatch.png";
import TranslateImage from "@/theme/assets/images/translate.png";
import NewRegistrationImage from "@/theme/assets/images/new-registration-icon.png";
import NewRegistrationImageDark from "@/theme/assets/images/new-registration-icon-dark.png";
import { ApplicationScreenProps } from "@/types/navigation";

function Example({ navigation }: ApplicationScreenProps) {
  const { t } = useTranslation(["example", "welcome"]);

  const {
    colors,
    variant,
    changeTheme,
    layout,
    gutters,
    fonts,
    components,
    backgrounds,
  } = useTheme();

  const [currentId, setCurrentId] = useState(-1);

  const { isSuccess, data, isFetching } = useQuery({
    queryKey: ["example", currentId],
    queryFn: () => {
      return fetchOne(currentId);
    },
    enabled: currentId >= 0,
  });

  useEffect(() => {
    if (isSuccess) {
      Alert.alert(t("example:welcome", data.name));
    }
  }, [isSuccess, data]);

  const onChangeTheme = () => {
    changeTheme(variant === "default" ? "dark" : "default");
  };

  const onChangeLanguage = (lang: "fr" | "en") => {
    void i18next.changeLanguage(lang);
  };

  if (
    !isImageSourcePropType(SendImage) ||
    !isImageSourcePropType(ColorsWatchImage) ||
    !isImageSourcePropType(TranslateImage)
  ) {
    throw new Error("Image source is not valid");
  }

  return (
    <SafeScreen>
      <ScrollView>
        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            gutters.marginTop_24,
          ]}
        >
          {/* <View
            style={[layout.relative, backgrounds.gray100, components.circle250]}
          /> */}

          <View style={[layout.relative]}>
            <Brand height={200} width={200} />
          </View>
        </View>

        <View style={[gutters.paddingHorizontal_32]}>
          <View style={[]}>
            <Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>
              {t("welcome:title")}
            </Text>
          </View>

          <View style={[gutters.marginTop_32]}>
            <Text
              style={[
                fonts.gray400,
                fonts.bold,
                fonts.size_24,
                gutters.marginBottom_12,
              ]}
            >
              {t("welcome:login")}
            </Text>
            <TextInput placeholder="username" style={[components.loginInput]} />
            <TextInput
              placeholder="password"
              secureTextEntry
              style={[components.loginInput, gutters.marginTop_12]}
            />

            <View
              style={[
                {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                },
                gutters.marginBottom_24,
                gutters.marginTop_12,
              ]}
            >
              <TouchableOpacity
                testID="login-button"
                onPress={() => console.log("Login Clicked!")}
                style={[
                  {
                    flex: 3,
                    marginRight: 12,
                    padding: 12,
                    borderColor: "transparent",
                    borderWidth: 2,
                    borderRadius: 12,
                    backgroundColor: colors.purple500,
                  },
                ]}
              >
                <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
                  Login
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                testID="register-button"
                onPress={() => navigation.navigate("Rules")}
                style={[
                  {
                    alignItems: "center",
                    backgroundColor: "transparent",
                  },
                ]}
              >
                <ImageVariant
                  testID="brand-img"
                  style={[{ width: 40, height: 40 }]}
                  source={NewRegistrationImage}
                  sourceDark={NewRegistrationImageDark}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* <View
            style={[
              layout.row,
              layout.justifyBetween,
              layout.fullWidth,
              gutters.marginTop_16,
            ]}
          >
            <TouchableOpacity
              testID="fetch-user-button"
              style={[components.buttonCircle, gutters.marginBottom_16]}
              onPress={() => setCurrentId(Math.ceil(Math.random() * 10 + 1))}
            >
              {isFetching ? (
                <ActivityIndicator />
              ) : (
                <ImageVariant
                  source={SendImage}
                  style={{ tintColor: colors.purple500 }}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              testID="change-theme-button"
              style={[components.buttonCircle, gutters.marginBottom_16]}
              onPress={() => onChangeTheme()}
            >
              <ImageVariant
                source={ColorsWatchImage}
                style={{ tintColor: colors.purple500 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              testID="change-language-button"
              style={[components.buttonCircle, gutters.marginBottom_16]}
              onPress={() =>
                onChangeLanguage(i18next.language === "fr" ? "en" : "fr")
              }
            >
              <ImageVariant
                source={TranslateImage}
                style={{ tintColor: colors.purple500 }}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Example;
