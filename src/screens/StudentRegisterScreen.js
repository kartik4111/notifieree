import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";

import authApi from "../api/auth";
import Error from "../components/Error";
import { AppForm, AppFormField, SubmitButton } from "../components/Forms";
import Loader from "../components/Loader";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  universityRollNo: Yup.number().required().label("University Roll No."),
  motherName: Yup.string().required().label("Mother Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
  confirmPassword: Yup.string().required().min(8).label("Confirm Password"),
  phoneNumber: Yup.string().matches(/^[6-9]\d{9}$/, {
    message: "Please enter valid number.",
    excludeEmptyString: false,
  }),
});

const StudentRegisterScreen = ({ navigation }) => {
  const [error, setError] = useState();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (value) => {
    setSubmitting(true);

    if (value.password === value.confirmPassword) {
      const data = value;

      data.motherName = data.motherName.toLowerCase();
      data.email = data.email.toLowerCase();
      delete data.confirmPassword;

      const { error } = await authApi.register("student", data);
      if (error) {
        setSubmitting(false);
        return setError(error);
      }

      navigation.goBack();
    } else {
      setSubmitting(false);
      setError("Passwords not match");
    }
  };

  if (submitting) return <Loader />;

  return (
    <KeyboardAwareScrollView
      style={styles.keyboard}
      keyboardShouldPersistTaps="always"
    >
      <Screen style={styles.container}>
        {error && <Error error={error} />}
        <AppForm
          initialValues={{
            universityRollNo: "",
            motherName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCorrect={false}
            icon="account"
            keyboardType="numeric"
            name="universityRollNo"
            placeholder="University Roll No."
          />
          <AppFormField
            autoCapitalize="words"
            autoCorrect={false}
            icon="account"
            name="motherName"
            placeholder="Mother Name"
          />
          <AppFormField
            icon="phone"
            name="phoneNumber"
            placeholder="Mobile Number"
            textContentType="telephoneNumber"
          />
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
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="confirmPassword"
            placeholder="Confirm Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Register" />
        </AppForm>
      </Screen>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  keyboard: {
    flex: 1,
  },
});

export default StudentRegisterScreen;
