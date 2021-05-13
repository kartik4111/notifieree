import React from "react";
import { useFormikContext } from "formik";
import AppButton from "../AppButton";
import colors from "../../config/colors";

const SubmitButton = ({ title, disabled }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton
      title={title}
      backgroundColor={colors.primary}
      disabled={disabled}
      onPress={handleSubmit}
    />
  );
};

export default SubmitButton;
