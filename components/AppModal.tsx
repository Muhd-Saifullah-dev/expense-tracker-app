import {
  Modal,
  View,
  Pressable,
} from "react-native";

import { ReactNode } from "react";

type Props = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function AppModal({
  visible,
  onClose,
  children,
}: Props) {

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >

      <View className="flex-1 bg-black/40 items-center justify-center">

        <View
          className="
            bg-white
            rounded-2xl
            p-4
         
            
          "
        >
          {children}
        </View>

      </View>

    </Modal>
  );
}