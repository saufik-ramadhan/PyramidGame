import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import firestore from "@react-native-firebase/firestore";
import EncryptedStorage from "react-native-encrypted-storage";

import { Checkbox, OrderedList } from "@/components/atoms";
import { BackButton, Brand } from "@/components/molecules";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";

import { ApplicationScreenProps } from "@/types/navigation";
import { useState } from "react";

function Registration({ navigation }: ApplicationScreenProps) {
  const { t } = useTranslation(["example", "welcome", "common"]);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { layout, gutters, fonts, colors, components } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
    },
  });

  /** Function to check if a document with a certain field exists */
  const checkDocumentExists = async (
    collectionName: string,
    fieldName: string,
    fieldValue: string
  ) => {
    try {
      const querySnapshot = await firestore()
        .collection(collectionName)
        .where(fieldName, "==", fieldValue)
        .get();
      return !querySnapshot.empty; // Returns true if document exists, false otherwise
    } catch (error: any) {
      console.log(error);
    }
  };

  /** Storing Authenticated (Registered) data */
  const storeAuthData = async (data: {
    fullname: string;
    username: string;
    password: string;
  }) => {
    try {
      await EncryptedStorage.setItem(
        "user_session",
        JSON.stringify({
          fullname: data.fullname,
          username: data.username,
          password: data.password,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  /** Submit Register */
  const onSubmit = async (data: {
    fullname: string;
    username: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const documentExists = await checkDocumentExists(
        "users",
        "username",
        data.username
      );

      if (!documentExists) {
        await firestore().collection("users").add(data);
        await storeAuthData(data);
        Alert.alert(`Success`, `User ${data.username} created sucessfully`, [
          {
            text: "OK",
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Dashboard" }],
              }),
          },
        ]);
      } else {
        Alert.alert("Username already exist, try another one.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Full Name"
                style={[components.loginInput, gutters.marginTop_12]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="fullname"
          />
          {errors.fullname && (
            <Text style={[{ color: "red" }, fonts.size_12]}>
              This is required.
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Username"
                style={[components.loginInput, gutters.marginTop_12]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
          />
          {errors.username && (
            <Text style={[{ color: "red" }, fonts.size_12]}>
              This is required.
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: "This is required",
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i,
                message:
                  "At least 8 characters, 1 letter, 1 number, 1 special character",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                secureTextEntry
                placeholder="Password"
                style={[components.loginInput, gutters.marginTop_12]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={[{ color: "red" }, fonts.size_12]}>
              {errors.password.message}
            </Text>
          )}
        </View>

        {/** Register Button */}
        <View style={[gutters.paddingHorizontal_32]}>
          <TouchableOpacity
            testID="login-button"
            onPress={handleSubmit(onSubmit)}
            style={[
              gutters.marginTop_24,
              {
                padding: 12,
                borderColor: colors.purple500,
                borderWidth: 3,
                borderBottomWidth: 8,
                borderRadius: 12,
              },
            ]}
          >
            {isLoading ? (
              <ActivityIndicator
                animating={isLoading}
                color={colors.purple500}
              />
            ) : (
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "bold",
                  color: colors.purple500,
                }}
              >
                Register
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Registration;
