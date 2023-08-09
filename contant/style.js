import { StyleSheet } from "react-native";
export const Colors = {
  primary50: "#F0F9FF",
  primary100: "#e0f3fe",
  primary200: "#b9e8fe",
  primary300: "#7bd7fe",
  primary400: "#35c3fb",
  primary500: "#0aa1dd",
  primary600: "#008aca",
  primary700: "#016ea3",
  primary800: "#055d87",
  primary900: "#0b4d6f",
  primary950: "#07314a",
  primary1000: "#000080",
  error100: "#FFBABA",
  error300: "#ffcc00",
  error500: "#9C0006",
  background: "##F7F7F7",

  primary: "#ffffff",
  secondary: "#E5E7EB",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#6D28D9",
  green: "#10B981",
  red: "#EF4444",
  yellow: "#FFA500",
  orange: " #FF5733",
  gray: "#6B7280",
  black: "black",

  lightGreen: "rgba(16,185,129,0.1)",
};
export const stylesTabBar = StyleSheet.create({
  tabBar: {
    marginHorizontal: 20,
    // marginVertical: 8,
    marginBottom: 8,
    height: 70,
    backgroundColor: Colors.primary1000,
    position: "absolute",
    elevation: 6,
    borderRadius: 20,
  },
  tabBarLabel: {
    textAlign: "center",
    fontSize: 14,
    bottom: 8,
    color: Colors.primary,
  },
  icon: {
    lineHeight: 50,
  },
  containerIconAdd: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Colors.primary800,
    alignItems: "center",
    justifyContent: "center",
  },
  iconAdd: {
    color: Colors.primary50,
  },
  slogan: {
    left: 20,
  },
});
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    marginBottom: 100,
  },
  menu: {
    flex: 1,
    backgroundColor: Colors.primary1000,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingVertical: 10,
    position: "relative",
    height: 220,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.primary,
    marginTop: 40,
  },
  menuIndex: {
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  menuRow: {
    height: 130,
    backgroundColor: Colors.primary,
    borderRadius: 25,
    marginTop: 150,
    marginHorizontal: 30,
    paddingBottom: 10,
    elevation: 8,
  },
  index: {
    fontSize: 15,
    color: Colors.primary100,
  },
  indexx: {
    fontSize: 35,
    fontWeight: "bold",
    color: Colors.primary300,
  },
  content: {
    alignItems: "center",
    top: 80,
  },
  textContent: {
    marginVertical: 10,
  },
  titleContent: {
    fontSize: 19,
  },
  text: {
    fontWeight: "bold",
    fontSize: 17,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  wrapperCustom: {
    color: Colors.primary900,
    height: 50,
    lineHeight: 50,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  button: {
    color: Colors.primary,
    fontWeight: "bold",
    height: 65,
    lineHeight: 65,
    textAlign: "center",
    borderRadius: 50,
    marginBottom: 8,
  },
  buttonResult: {
    width: 65,
  },

  pressed: {
    opacity: 0.7,
  },
});
