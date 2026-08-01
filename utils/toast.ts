import * as Burnt from "burnt";

export const showSuccess = (
  title: string,
  message?: string
) => {
  Burnt.toast({
    title,
    message,
    preset: "done",
  });
};

export const showError = (
  title: string,
  message?: string
) => {
  Burnt.toast({
    title,
    message,
    preset: "error",
  });
};

export const showInfo = (
  title: string,
  message?: string
) => {
  Burnt.toast({
    title,
    message,
    preset: "none",
  });
};