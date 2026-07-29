import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import * as Location from "expo-location";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [open, setOpen] = useState(false);
  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Location permission denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    console.log("Coordinates:", location.coords);

    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    console.log("Address:", address);

    if (address.length > 0) {
      const place = address[0];

      setCity(place.city ?? "");
      setRegion(place.region ?? "");
      setPostalCode(place.postalCode ?? "");

      console.log("City:", place.city);
      console.log("Region:", place.region);
      console.log("Postal Code:", place.postalCode);
    }
  };
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 bg-background justify-center px-6">
        <Card>
          <CardHeader className="items-center">
            <CardTitle className="text-3xl">Create Account</CardTitle>

            <CardDescription className="text-center">
              Sign up to start tracking your expenses
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Input
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              className="mb-4"
            />

            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="mb-4"
            />

            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button className="mt-6" onPress={() => setOpen(true)}>
              <Text>Create Account</Text>
            </Button>

            <View className="flex-row justify-center mt-6">
              <Text className="text-muted-foreground">
                Already have an account?
              </Text>

              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text className="ml-2 text-primary font-semibold">Login</Text>
              </TouchableOpacity>
            </View>
          </CardContent>
        </Card>
      </View>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[90%] max-w-sm">
          <DialogHeader>
            <DialogTitle>Enable Location</DialogTitle>

            <DialogDescription>
              We use your location to detect your city and postal code
              automatically.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onPress={() => setOpen(false)}>
              <Text>Cancel</Text>
            </Button>

            <Button
              onPress={async () => {
                setOpen(false);
                await getUserLocation();
              }}
            >
              <Text>Access</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </KeyboardAvoidingView>
  );
}
