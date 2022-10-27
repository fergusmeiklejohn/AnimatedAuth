import {
  useWindowDimensions,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "./styles";
import Svg, { Image } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  FadeOutUp,
  FadeInUp,
} from "react-native-reanimated";

import loginBackground from "./assets/loginbackground.jpg";
import { useState } from "react";

export default function App() {
  const [loginOrRegister, setLoginOrRegister] = useState<"Login" | "Register">(
    "Register"
  );
  const [formActive, setFormActive] = useState(false);

  const { width, height } = useWindowDimensions();
  const imagePosition = useSharedValue(1);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [height / 3, 0]
    );
    return {
      transform: [{ translateY: withTiming(interpolation, { duration: 300 }) }],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [1, 0]);
    return {
      opacity: withDelay(500, withTiming(interpolation, { duration: 300 })),
    };
  });

  const loginHandler = () => {
    setLoginOrRegister("Login");
    setFormActive(true);
    imagePosition.value = 0;
  };
  const registerHandler = () => {
    setLoginOrRegister("Register");
    setFormActive(true);
    imagePosition.value = 0;
  };
  const closeHandler = () => {
    setFormActive(false);
    imagePosition.value = 1;
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg width={width} height={height}>
          <Image
            href={loginBackground}
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
          />
        </Svg>
        <Pressable onPress={closeHandler} style={styles.closeButtonContainer}>
          <Text>X</Text>
        </Pressable>
      </Animated.View>
      {!formActive ? (
        <Animated.View
          style={styles.buttonContainer}
          exiting={FadeOutUp.delay(100)}
          entering={FadeInUp.delay(600)}
        >
          <Pressable onPress={loginHandler} style={styles.button}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
          <Pressable onPress={registerHandler} style={styles.button}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View>
      ) : null}

      <Animated.View style={styles.formInputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="black"
          style={styles.textInput}
        />
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="black"
          style={[
            styles.textInput,
            { display: loginOrRegister === "Register" ? "flex" : "none" },
          ]}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="black"
          style={styles.textInput}
        />
        <Pressable style={[styles.button, styles.formButton]}>
          <Text style={styles.buttonText}>
            {loginOrRegister === "Login" ? "LOGIN" : "REGISTER"}
          </Text>
        </Pressable>
      </Animated.View>
      <StatusBar style="light" />
    </View>
  );
}
