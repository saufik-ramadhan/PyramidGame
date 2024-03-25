import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";

/** Function to check if a document with a certain field exists */
const checkDocumentExists = async (username: string, password: string) => {
  try {
    const querySnapshot = await firestore()
      .collection("users")
      .where("username", "==", username)
      .where("password", "==", password)
      .get();
    return querySnapshot; // Returns true if document exists, false otherwise
  } catch (error: any) {
    console.log(error);
  }
};

const storeAuthData = async (data: {
  fullname: string;
  username: string;
  password: string;
}) => {
  try {
    if (data === null) throw "Data empty";
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

export default async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const user = await checkDocumentExists(username, password);
    if (user?.empty) {
      Alert.alert("Failed", "There's no user with this information");
      return false;
    }
    const userData: any = user?.docs[0]?.data() ?? null;
    await storeAuthData(userData);
    return !user?.empty;
  } catch (error) {
    return false;
  }
};
