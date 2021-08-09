import { message } from "antd";

export const showErrorMessage = (errorMessage) => {
  return message.error(errorMessage);
};

export const showSuccessMessage = (successMessage) => {
  return message.success(successMessage);
};
