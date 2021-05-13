import React, { useState } from "react";
import { StyleSheet } from "react-native";
import CountDown from "react-native-countdown-component";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "../components/AppText";
import { AppForm, AppFormField, SubmitButton } from "../components/Forms";
import { render } from "react-dom";
const validationSchema = Yup.object().shape({
  otp: Yup.number().required().label("OTP"),
});

function OTPScreen(props) {
  const [disabled, setDisabled] = useState(false);
  return (
    <Screen style={styles.container}>
      <MaterialCommunityIcons
        name="email-open"
        size={80}
        color={colors.primary}
      />
      <AppText
        style={{
          fontFamily: "sans-serif-light",
          textAlign: "center",
          fontSize: 18,
        }}
      >
        We have sent you OTP on your email.{"\n"}abc@gmail.com
      </AppText>
      <AppForm initialValues={{ otp: "" }} validationSchema={validationSchema}>
        <AppFormField
          autoCorrect={false}
          icon="lock"
          keyboardType="numeric"
          name="otp"
          placeholder="Enter OTP"
        />
        <SubmitButton title="Verify OTP" disabled={disabled} />
        <CountDown
          until={5}
          onFinish={() => setDisabled(true)}
          size={25}
          timeToShow={["M", "S"]}
          timeLabels={{ m: "", s: "" }}
          digitStyle={styles.timer}
          digitTxtStyle={{ color: colors.primary }}
          showSeparator={true}
          separatorStyle={{ color: colors.primary, marginBottom: 3 }}
        />
      </AppForm>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    marginVertical: 50,
  },
  timer: {
    backgroundColor: "transparent",
    marginHorizontal: -15,
  },
});

export default OTPScreen;
