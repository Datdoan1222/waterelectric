import React from "react";

import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GoBack from "../component/Ui/GoBack";
import { Colors } from "../contant/style";
import Energy from "../component/energy/Energy";
import Bill from "../component/Ui/Bill";

function PowerDetailsScreen({
  totalMoney,
  iswarning,
  title,
  dataEnergy,
  goback,
  content,
}) {
  const backgroundWorking = { backgroundColor: Colors.primary1000 };
  const backgroundWarning = { backgroundColor: "#FF8400" };
  return (
    <View
      style={[
        styles.container,
        iswarning ? backgroundWarning : backgroundWorking,
      ]}
    >
      <GoBack onPress={goback} />
      <View style={styles.totalMoney}>
        <View style={styles.logo}>
          <Text style={[styles.title, styles.text]}>{title}</Text>
          <Text style={[styles.time, styles.text]}>July 22, 2023</Text>
          <Text
            style={[
              styles.money,
              iswarning ? { color: Colors.secondary } : { color: "#E7B987" },
            ]}
          >
            {totalMoney} VND
          </Text>
        </View>
        <View>
          {iswarning ? (
            <Image
              style={styles.image}
              source={require("../contant/image/warning.png")}
            />
          ) : (
            <Image
              style={styles.image}
              source={require("../contant/image/card.png")}
            />
          )}
        </View>
      </View>

      <ScrollView style={styles.content}>
        {iswarning && (
          <View style={styles.warning}>
            <Ionicons name="warning-outline" size={40} color="white" />
            <Text style={styles.textWarning}>{content}</Text>
          </View>
        )}
        <View style={{ height: 490 }}>
          <Energy
            dataEnergy={dataEnergy}
            backgroundWarning={
              iswarning
                ? backgroundWarning
                : { backgroundColor: Colors.primary600 }
            }
          />
          <Bill name={title} totalMoney={totalMoney} />
        </View>
      </ScrollView>
    </View>
  );
}
export default PowerDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    backgroundColor: Colors.primary1000,
    position: "relative",
  },

  totalMoney: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 30,
    marginBottom: 20,
  },
  logo: {
    marginTop: 60,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 15,
    marginTop: 150,
  },
  warning: {
    flexDirection: "row",
    backgroundColor: "#FF8400",
    alignItems: "center",
    marginHorizontal: 30,
    paddingHorizontal: 40,
    marginBottom: 8,
    borderRadius: 10,
  },
  textWarning: {
    color: Colors.primary,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 250,
  },
  text: {
    fontWeight: "bold",
    color: Colors.primary,
  },
  title: {
    fontSize: 24,
  },
  time: {
    fontSize: 13,
  },
  money: {
    fontWeight: "bold",
    fontSize: 30,
    marginVertical: 10,
    color: "#E7B987",
  },
  pressed: {
    backgroundColor: Colors.primary900,
    height: 50,
    width: 100,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
});
