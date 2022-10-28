import {
  useWindowDimensions,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "./styles";
import Svg, { ClipPath, Ellipse, Image } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  FadeIn,
  FadeOut,
  FadeOutUp,
  FadeInUp,
  FadeInDown,
  FadeOutDown,
} from "react-native-reanimated";

import loginBackground from "./assets/loginbackground.jpg";
import React, { useState } from "react";

export default function App() {
  const [loginOrRegister, setLoginOrRegister] = useState<"Login" | "Register">(
    "Register"
  );
  const [formActive, setFormActive] = useState(false);

  const { width, height } = useWindowDimensions();
  const imagePosition = useSharedValue(1);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    let additionalHeight = loginOrRegister === "Login" ? 0 : 50;
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2 - additionalHeight, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-20}
    >
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg width={width} height={height + 50}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height + 50} />
          </ClipPath>
          <Image
            href={loginBackground}
            width={width + 50}
            height={height + 50}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
        </Svg>
        {formActive ? (
          <Animated.View
            entering={FadeInDown.delay(400)}
            exiting={FadeOutDown.delay(100)}
            style={{ zIndex: 10 }}
          >
            <Pressable
              onPress={closeHandler}
              style={styles.closeButtonContainer}
            >
              <Text>X</Text>
            </Pressable>
          </Animated.View>
        ) : null}
      </Animated.View>
      {!formActive ? (
        <Animated.View
          style={styles.buttonContainer}
          entering={FadeInUp.delay(400)}
          exiting={FadeOutUp.delay(100)}
        >
          <Pressable onPress={loginHandler} style={styles.button}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
          <Pressable onPress={registerHandler} style={styles.button}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View>
      ) : null}
      {formActive ? (
        <Animated.View
          style={styles.formInputContainer}
          entering={FadeIn.delay(500)}
          exiting={FadeOut.delay(100)}
        >
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
      ) : null}

      <StatusBar style="light" />
    </KeyboardAvoidingView>
  );
}
