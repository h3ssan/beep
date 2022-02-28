import { ApolloError } from "@apollo/client";
import { Alert as NativeAlert } from "react-native";
import { isMobile } from "./config";

const doAlert = isMobile
  ? NativeAlert.alert
  : (title: string, body: string) => alert(body);

export function Alert(error: ApolloError, title = "Error") {
  if (error?.message === "Validation Error") {
    const errors = error?.graphQLErrors[0]?.extensions;

    const keys = Object.keys(errors);

    const output = keys.map((key) => {
      return errors[key][0] as string;
    });

    doAlert(title, output.join("\n"));
    return;
  }

  doAlert(title, error.message);
}
