import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";

import authApi from "../api/auth";
import AppText from "../components/AppText";
import Error from "../components/Error";
import { AppForm, AppFormField, SubmitButton } from "../components/Forms";
import Screen from "../components/Screen";
import colors from "../config/colors";
import Loader from "../components/Loader";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const StudentLoginScreen = ({ navigation }) => {
  const [error, setError] = useState();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (value) => {
    setSubmitting(true);

    value.email = value.email.toLowerCase();
    const { error } = await authApi.login(value);

    setSubmitting(false);
    if (error) return setError(error);

    navigation.navigate("OTP", { data: value });
  };

  if (submitting) return <Loader />;

  return (
    <KeyboardAwareScrollView
      style={styles.keyboard}
      keyboardShouldPersistTaps="always"
    >
      <Screen style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/app_logo.png")}
        />
        <Image
          style={styles.logoText}
          source={require("../assets/logo_purple.png")}
        />
        {error && <Error error={error} />}
        <AppForm
          initialValues={{ email: "", password: "" }}
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
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Login" />
          <AppText
            style={[{ color: colors.primary }, styles.footerText]}
            onPress={() => navigation.navigate("Forgot Password")}
          >
            Forgot Password
          </AppText>
          <View style={styles.footer}>
            <AppText style={styles.footerText}>Haven't registered yet?</AppText>
            <AppText
              style={styles.register}
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </AppText>
          </View>
        </AppForm>
      </Screen>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  footer: {
    flexDirection: "row",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
  },
  keyboard: {
    flex: 1,
  },
  logo: {
    alignSelf: "center",
    height: 150,
    width: 150,
    marginTop: 20,
    marginBottom: -30,
  },
  logoText: {
    alignSelf: "center",
    height: 92,
    width: "80%",
    marginTop: -20,
    marginBottom: 0,
  },
  register: {
    color: colors.error,
    fontSize: 16,
    marginLeft: 10,
  },
});
export default StudentLoginScreen;
