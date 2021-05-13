import React from "react";
import { useFormikContext } from "formik";
import AppButton from "../AppButton";
import colors from "../../config/colors";

const SubmitButton = ({ title }) => {
  const { handleSubmit } = useFormikContext();

  return <AppButton title={title} backgroundColor={colors.primary} onPress={handleSubmit} />;
};

export default SubmitButton;