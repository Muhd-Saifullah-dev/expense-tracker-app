import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Track Your Expenses",
    description: "Keep track of your daily spending easily.",
    image: require("../../assets/onboarding/1.png"),
  },
  {
    id: "2",
    title: "Manage Your Budget",
    description: "Create budgets and control your spending.",
    image: require("../../assets/onboarding/2.png"),
  },
  {
    id: "3",
    title: "Reach Your Goals",
    description: "Save smarter and achieve your financial goals.",
    image: require("../../assets/onboarding/3.png"),
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
      });
    } else {
      router.replace("/(auth)/login");
    }
  };

  return (
    <View className="flex-1 bg-background">
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View className="justify-center items-center px-6" style={{ width }}>
            <Image
              source={item.image}
              className="w-72 h-72"
              resizeMode="contain"
            />

            <Text className="text-foreground text-4xl font-bold">
              {item.title}
            </Text>

            <Text className="text-muted-foreground text-center mt-4">
              {item.description}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Button */}
      <View className="px-6 pb-10">
        <TouchableOpacity
          onPress={nextSlide}
          className="bg-primary py-4 rounded-2xl"
        >
          <Text className="text-primary-foreground text-center font-bold">
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
