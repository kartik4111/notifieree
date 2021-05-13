import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import AppText from "../components/AppText";
import { AppForm, AppFormField, SubmitButton } from "../components/Forms";
import Screen from "../components/Screen";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function ForgotPasswordScreen(props) {
  return (
    <Screen style={styles.container}>
      <AppText style={styles.boldText}>Forgot your password?</AppText>
      <AppText style={{ fontFamily: "sans-serif-light" }}>
        Confirm your email address
      </AppText>
      <AppForm
        initialValues={{ email: "" }}
        // onSubmit={{  }}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <SubmitButton title="Send OTP" />
      </AppForm>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  boldText: {
    color: colors.light.text,
    fontWeight: "700",
    fontSize: 25,
    fontFamily: "notoserif",
    marginVertical: 20,
  },
});

export default ForgotPasswordScreen;
