import { TextInput, TextInputProps } from "react-native";
import React from "react";

interface InputProps extends TextInputProps {
  className?: string;
}

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <TextInput
      {...props}
      className={`rounded-2xl
        px-4
        py-3
        bg-input-background
        border
        border-input-border
        text-input-text ${className}`}
      placeholderTextColor="#9CA3AF"
    />
  );
}
