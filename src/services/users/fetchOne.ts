import { instance } from "@/services/instance";
import { userSchema } from "@/types/schemas/user";
import EncryptedStorage from "react-native-encrypted-storage";

export default async (id: number) => {
  try {
    const session = await EncryptedStorage.getItem("user_session");

    if (session !== undefined) {
      // Congrats! You've just retrieved your first value!
      const parsedData: {
        fullname: string;
        username: string;
        password: string;
      } = await JSON.parse(session ?? "");
      return parsedData;
    } else {
      return null;
    }
  } catch (error) {
    throw "Error";
  }
};
