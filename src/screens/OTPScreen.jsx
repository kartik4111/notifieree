import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import authApi from "../api/auth";
import AppText from "../components/AppText";
import utils from "../api/utils";
import Error from "../components/Error";
import { AppForm, AppFormField, SubmitButton } from "../components/Forms";
import Loader from "../components/Loader";
import Screen from "../components/Screen";
import colors from "../config/colors";
import useAuth from "../hooks/useAuth";

const validationSchema = Yup.object().shape({
  otp: Yup.string().min(6).max(6).required().label("OTP")
});

const OTPScreen = ({ route }) => {
  const data = route.params.data;

  const { setUser } = useAuth();
  const [error, setError] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [timer, setTimer] = useState(120);
  let timerInterval;

  useEffect(() => {
    timer === 0 ? clearInterval(timerInterval) : timerInterval = setInterval(() => setTimer(timer - 1), 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);

  const handleSubmit = async ({ otp }) => {
    setSubmitting(true);
  
    const value = {
      ...data,
      otp
    };
    const { error, data: userData } = await utils.validateOTP(value);
    
    if (error) {
      setSubmitting(false);
      return setError("Invalid OTP");
    }

    setUser(userData);
  };

  const resendCode = async () => {
    const { error } = await authApi.login(data);
    if (error) return setError(error);

    setTimer(120);
  };

  if (submitting) return <Loader />;

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      keyboardShouldPersistTaps="always"
    >
      <Screen style={styles.container}>
        <MaterialCommunityIcons
          name="email-open"
          size={80}
          color={colors.primary}
        />
        <AppText style={styles.text}>
          {`OTP sent to your registered email ${data.email}`}
        </AppText>
        {error && <Error error={error} />}
        <AppForm 
          initialValues={{ otp: "" }} 
          validationSchema={validationSchema}
          onSubmit={handleSubmit}  
        >
          <View>
            <AppFormField
              autoCorrect={false}
              icon="lock"
              name="otp"
              placeholder="Enter OTP"
            />
            <View style={styles.timer}>
              {timer ? (
                <AppText 
                  style={{ 
                    color: colors.medium,
                    fontSize: 14 
                  }}>
                    {timer}s
                </AppText>
              ) : (
                <TouchableOpacity onPress={resendCode}>
                  <AppText 
                    style={{ 
                      color: colors.primary,
                      fontSize: 14 
                    }}>
                      Resend Code
                  </AppText>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <SubmitButton title="Verify OTP" disabled={timer ? false : true} />
      </AppForm>
      </Screen>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  text: {
    fontFamily: "sans-serif-light",
    lineHeight: 25,
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10
  },
  timer: {
    position: "absolute",
    right: 12,
    top: 30
  },
});

export default OTPScreen;
