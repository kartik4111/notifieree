import React from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";
import AppText from "../components/AppText";
import { AppForm, AppFormField, SubmitButton } from "../components/Forms";
import Screen from "../components/Screen";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  password: Yup.string().required().min(8).label("Password"),
  confirmPassword: Yup.string().required().min(8).label("Confirm Password"),
});

function ResetPasswordScreen(props) {
  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        // onSubmit={{}}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="confirmPassword"
          placeholder="Confirm Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Reset Password" />
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
});

export default ResetPasswordScreen;
