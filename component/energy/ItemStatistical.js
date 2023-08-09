import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../contant/style";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import tinycolor from "tinycolor2";
const borderColor = tinycolor("#FF8400").darken(-22).toHexString();
const backgroundColor = tinycolor("#FF8400").darken(-38).toHexString();
function ItemStatistical({
  warning,
  ionicon,
  icon,
  name,
  index,
  unit,
  onPress,
}) {
  const colorIcon = warning && Colors.error500;
  return (
    <Pressable
      android_ripple={{ color: "#ccc" }} //android
      // ios
      style={({ pressed }) => [styles.item, warning && styles.itemWarning]}
      onPress={onPress}
    >
      <View style={styles.titleRow}>
        {!ionicon && (
          <SimpleLineIcons
            style={styles.image}
            name={icon}
            color={warning ? Colors.error500 : Colors.primary1000}
            size={50}
          />
        )}
        {ionicon && (
          <Ionicons
            style={styles.image}
            name={icon}
            color={warning ? Colors.error500 : Colors.primary1000}
            size={50}
          />
        )}
        <View>
          <Text
            style={[
              styles.context,
              warning
                ? { fontSize: 23, color: Colors.error500 }
                : { fontSize: 23, color: Colors.primary1000 },
            ]}
          >
            {index}
          </Text>
          <Text style={[styles.unit, warning && { color: Colors.error500 }]}>
            {unit}
          </Text>
        </View>
      </View>
      <View style={styles.index}>
        <Text
          style={[
            styles.context,
            { fontSize: 14 },
            warning ? { color: Colors.error500 } : { color: Colors.gray },
          ]}
        >
          {name}
        </Text>
        {warning && (
          <Ionicons name="warning-outline" color={Colors.error500} size={30} />
        )}
      </View>
    </Pressable>
  );
}
export default ItemStatistical;
const styles = StyleSheet.create({
  item: {
    width: 170,
    height: 160,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 20,
    elevation: 4,
    backgroundColor: Colors.primary,
    shadowColor: "#000000", // Color of the shadow
    shadowOffset: { width: 0, height: 2 }, // Offset of the shadow (x, y)
    shadowOpacity: 0.3, // Opacity of the shadow (0 to 1)
    shadowRadius: 4, // Blur radius of the shadow
  },
  itemWarning: {
    borderColor: borderColor,
    borderWidth: 4,
    backgroundColor: backgroundColor,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    marginBottom: 16,
  },
  context: {
    fontWeight: "bold",
  },
  unit: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.primary1000,
  },
});
