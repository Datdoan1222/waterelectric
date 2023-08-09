import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../contant/style";
function ChildMenu({ title, childIndex, index }) {
  return (
    <View style={styles.childMenu}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.childIndex}>{childIndex} kWh</Text>
      <Text style={styles.index}>{index} m³</Text>
    </View>
  );
}

export default ChildMenu;
const styles = StyleSheet.create({
  childMenu: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.black,
    marginTop: 10,
    marginBottom: 10,
  },
  childIndex: {
    color: Colors.primary600,
    fontSize: 17,
    fontWeight: "bold",
  },
  index: {
    fontSize: 15,
  },
});
