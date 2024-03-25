import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import EncryptedStorage from "react-native-encrypted-storage";
import { ApplicationScreenProps } from "@/types/navigation";
import { useTheme } from "@/theme";

type UserData = {
  fullname: string;
  username: string;
  password: string;
};

export default function Dashboard({ navigation }: ApplicationScreenProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();

  /** Retrieve Authenticated Data */
  async function retrieveAuthData() {
    try {
      const session = await EncryptedStorage.getItem("user_session");

      if (session !== undefined) {
        // Congrats! You've just retrieved your first value!
        const parsedData = await JSON.parse(session ?? "");
        setUser(parsedData);
      }
    } catch (error) {}
  }

  /** Remove auth data (logout) */
  async function removeAuthData() {
    try {
      await EncryptedStorage.removeItem("user_session");
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Example" }],
        });
      }, 500);
    } catch (error) {}
  }

  useEffect(() => {
    retrieveAuthData();
  }, []);

  return (
    <View>
      <Text>Full Name : {user?.fullname}</Text>
      <Text>Username : {user?.username}</Text>
      <Text>Password : {user?.password}</Text>

      <TouchableOpacity
        onPress={removeAuthData}
        style={[
          {
            padding: 10,
            backgroundColor: "red",
            borderRadius: 5,
            marginTop: 10,
          },
        ]}
      >
        {isLoading ? (
          <ActivityIndicator animating={isLoading} color={colors.white} />
        ) : (
          <Text style={{ textAlign: "center" }}>Logout</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
