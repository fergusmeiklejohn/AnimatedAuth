import { StyleSheet, Dimensions, Button } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    // justifyContent: "center",
    position: "absolute",
    bottom: 0,
    height: height / 3,
    width: width,
  },
  closeButtonContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    transform: [{ translateY: -20 }],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
  },
  button: {
    backgroundColor: "rgba(53, 172, 180, 0.9)",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.6,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#0B4E5840",
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  formInputContainer: {
    marginBottom: 70,
    zIndex: -10,
  },
  formButton: {
    backgroundColor: "#0E9691",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default styles;

// #0B4E58
// #0E9691
// #A4BBAC
// #27BB98
// #35ACB4
