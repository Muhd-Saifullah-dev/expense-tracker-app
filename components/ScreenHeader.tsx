import { View, Text } from "react-native";
import { LucideIcon } from "lucide-react-native";
import { MotiView } from "moti";

type HeaderProps = {
  title: string;
  Icon?: LucideIcon;
  titleClassName?: string;
  iconColor?: string;
};

export default function ScreenHeader({
  title,
  Icon,
  titleClassName = "text-white",
  iconColor = "#ffff",
}: HeaderProps) {
  return (
    <MotiView
       from={{
    opacity: 0,
    translateY: -10,
  }}
  animate={{
    opacity: 1,
    translateY: 0,
  }}
  transition={{
    type: "timing",
    duration: 300,
  }}
      className="mt-4 flex-row items-center justify-between px-4 py-4"
    >
      <Text className={`text-2xl font-bold ${titleClassName}`}>{title}</Text>

      {Icon && <Icon size={22} color={iconColor} />}
    </MotiView>
  );
}
