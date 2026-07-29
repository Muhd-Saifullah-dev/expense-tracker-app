import { View, ViewProps } from "react-native";
import React from "react";

interface CardProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

export default function Card({
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <View
      {...props}
      className={`bg-card rounded-3xl p-6 ${className}`}
    >
      {children}
    </View>
  );
}