import React from "react";
import { Pressable, Text } from "react-native";
import { Colors, styles } from "../../contant/style";

function Button({ children, color, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: color,
        },
        !style && styles.buttonResult,
        pressed && styles.pressed,
        styles.button,
      ]}
    >
      {<Text style={styles.button}>{children}</Text>}
    </Pressable>
  );
}
export default Button;
