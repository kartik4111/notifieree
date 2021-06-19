import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import api from "../api/utils";
import AppText from "../components/AppText";
import Error from "../components/Error";
import { AppForm, AppFormField, SubmitButton } from "../components/Forms";
import Loader from "../components/Loader";
import Screen from "../components/Screen";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

const ForgotPasswordScreen = ({ navigation }) => {
  const [error, setError] = useState();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async ({ email }) => {
    setSubmitting(true);
    const result = await api.forgetPassword(email);
    setSubmitting(false);

    if (!result) return setError('Email not found');
    navigation.navigate('OTP', { data: { email } });
  };

  if (submitting) return <Loader />;

  return (
    <Screen style={styles.container}>
      <AppText style={styles.boldText}>Forgot your password?</AppText>
      <AppText style={{ fontFamily: "sans-serif-light" }}>
        Confirm your email address
      </AppText>
      {error && <Error error={error} />}      
      <AppForm
        initialValues={{ email: "" }}
        onSubmit={handleSubmit}
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
  },
});

export default ForgotPasswordScreen;
