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

import loginBackground from "./assets/loginbackground.jpg";

export default function App() {
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <Svg width={width} height={height / 2}>
          <Image
            href={loginBackground}
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
          />
        </Svg>
        <View style={styles.closeButtonContainer}>
          <Text>X</Text>
        </View>
      </View>
      {/* <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </Pressable>
      </View> */}
      <View style={styles.formInputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="black"
          style={styles.textInput}
        />
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="black"
          style={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="black"
          style={styles.textInput}
        />
        <Pressable style={[styles.button, styles.formButton]}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </Pressable>
      </View>
      <StatusBar style="light" />
    </View>
  );
}
