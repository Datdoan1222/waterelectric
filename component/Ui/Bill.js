import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { height, width } from "react-native-dimension";
import moment from "moment";
import { Colors } from "../../contant/style";
function Bill({
  totalMoney,
  name,
  totalEnergy,
  waterToday,
  electricToday,
  date,
}) {
  const electricPrices = [1.728, 1.786, 2.074, 2.612, 2.919, 3.015];
  const waterPrices = [6.7, 12.9, 14.4];
  // Tính tiền điện
  function calculateElectricBill(electricToday) {
    let electricBill = 0;
    for (let i = 0; i < electricPrices.length; i++) {
      if (electricToday <= 50) {
        electricBill += electricToday * electricPrices[i];
        break;
      } else {
        electricBill += 50 * electricPrices[i];
        electricToday -= 50;
      }
    }
    return electricBill.toFixed(3);
  }

  // Tính tiền nước
  function calculateWaterBill(waterToday) {
    let waterBill = 0;
    for (let i = 0; i < waterPrices.length; i++) {
      if (waterToday <= 4) {
        waterBill += waterToday * waterPrices[i];
        break;
      } else {
        waterBill += 4 * waterPrices[i];
        waterToday -= 4;
      }
    }
    return waterBill.toFixed(3);
  }
  const moneyElectric = parseInt(calculateElectricBill(electricToday));
  const moneyWater = parseInt(calculateWaterBill(waterToday));
  const total = moneyElectric + moneyWater;
  const firstDayOfMonth = moment()
    .startOf("month")
    .format("dddd, MMMM Do YYYY");
  const lastDayOfMonth = moment().endOf("month").format("dddd, MMMM Do YYYY");
  const afterSevenDays = moment()
    .endOf("month")
    .add(7, "days")
    .format("dddd, MMMM Do YYYY");
  const monthName = moment().format("MMMM");
  return (
    <View style={styles.container}>
      <View style={styles.bill}>
        <View style={styles.title}>
          <View>
            <Text style={styles.label}>{name}</Text>
          </View>
          {totalMoney ? (
            <>
              <View style={styles.date}>
                <Text style={styles.right}>This Month : {monthName}</Text>
                <Text style={styles.right}>
                  <Text style={{ fontWeight: "bold" }}>to </Text>
                  {firstDayOfMonth}
                </Text>
                <Text style={styles.right}>
                  <Text style={{ fontWeight: "bold" }}>from </Text>{" "}
                  {lastDayOfMonth}
                </Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.date}>
                <Text style={styles.right}>Date: {date}</Text>
              </View>
            </>
          )}
        </View>
        <View style={styles.prevent}>
          <View
            style={[
              totalMoney
                ? styles.circle
                : [styles.circle, { backgroundColor: "#f1f1f1" }],
            ]}
          />
          <Text style={styles.preventText}>
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - -
          </Text>
          <View
            style={[
              totalMoney
                ? styles.circle
                : [styles.circle, { backgroundColor: "#f1f1f1" }],
            ]}
          />
        </View>

        <View style={styles.pay}>
          <View>
            <Text style={styles.left}>EXPIRES TO</Text>
            <Text style={styles.left}>{afterSevenDays}</Text>
          </View>
          <View
            style={{
              alignSelf: "flex-end",
            }}
          >
            {totalEnergy && (
              <>
                <Text style={[styles.right, { fontWeight: "bold" }]}>
                  Total ElectricalPower
                </Text>
                <Text
                  style={[
                    styles.right,
                    {
                      color: Colors.error500,
                      fontWeight: "bold",
                      fontSize: 13,
                    },
                  ]}
                >
                  {calculateElectricBill(electricToday)} VND
                </Text>
                <Text style={[styles.right, { fontWeight: "bold" }]}>
                  Total WaterPower
                </Text>
                <Text
                  style={[
                    styles.right,
                    {
                      color: Colors.error500,
                      fontWeight: "bold",
                      fontSize: 13,
                    },
                  ]}
                >
                  {calculateWaterBill(waterToday)} VND
                </Text>
                <Text style={styles.preventText}>
                  - - - - - - - - - - - - - -
                </Text>
              </>
            )}
            <Text style={[styles.right, { fontWeight: "bold" }]}>
              Total Bill
            </Text>
            <Text
              style={[
                styles.right,
                { color: Colors.error500, fontWeight: "bold", fontSize: 19 },
              ]}
            >
              {totalEnergy ? total.toFixed(3) : totalMoney}VND
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
export default Bill;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    top: 20,
  },
  bill: {
    alignSelf: "center",
    width: width(88),
    borderRadius: width(4),
    backgroundColor: "#E7B987",
  },
  pay: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  prevent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  label: {
    fontWeight: "bold",
    padding: 10,
  },
  date: {
    alignSelf: "flex-end",
    padding: 10,
  },
  right: {
    textAlign: "right",
  },
  left: {
    textAlign: "left",
  },
  circle: {
    height: height(4),
    width: width(8),
    borderRadius: width(10),
    backgroundColor: "white",
  },
  preventText: {
    color: "white",
    fontWeight: "bold",
  },
});
