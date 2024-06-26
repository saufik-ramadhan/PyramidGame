import type { StackScreenProps } from "@react-navigation/stack";

export type ApplicationStackParamList = {
  Startup: undefined;
  Example: undefined;
  Rules: undefined;
  Registration: undefined;
  Dashboard: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
