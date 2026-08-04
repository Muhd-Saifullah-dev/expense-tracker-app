import { cssInterop } from "nativewind";
import * as Icons from "lucide-react-native";

Object.values(Icons).forEach((Icon: any) => {
  if (typeof Icon === "function") {
    cssInterop(Icon, {
      className: {
        target: "style",
        nativeStyleToProp: {
          color: true,
          stroke: true,
        },
      },
    });
  }
});