import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import utils from "../api/utils";
import AppText from "../components/AppText";
import Error from "../components/Error";
import { AppForm, AppFormField, SubmitButton } from "../components/Forms";
import Loader from "../components/Loader";
import Screen from "../components/Screen";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  password: Yup.string().required().min(8).label("Password"),
  confirmPassword: Yup.string().required().min(8).label("Confirm Password"),
});

const ResetPasswordScreen = ({ navigation, route }) => {
  const data = route.params.data;
  const [error, setError] = useState();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (value) => {
    setSubmitting(true);

    value = {
      ...data,
      ...value
    };
    
    setSubmitting(false);

    if (value.password !== value.confirmPassword) return setError("Password not match");

    const result = await utils.resetPassword(value);
    return result ? navigation.popToTop() : setError("Something went wrong");
  };

  if (submitting) return <Loader />;
  
  return (
    <Screen style={styles.container}>
      {error && <Error error={error} />}
      <AppForm
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        onSubmit={handleSubmit}
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
