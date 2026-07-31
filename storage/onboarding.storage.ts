import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDING_KEY = "onboarding_completed";

export const setOnboardingCompleted = async () => {
  await AsyncStorage.setItem(ONBOARDING_KEY, "true");
};

export const getOnboardingCompleted = async () => {
  return await AsyncStorage.getItem(ONBOARDING_KEY);
};

export const removeOnboardingCompleted = async () => {
  await AsyncStorage.removeItem(ONBOARDING_KEY);
};