import React from "react";
import { View, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { LineChart, PieChart, ProgressChart } from "react-native-chart-kit";
import { Colors } from "../../contant/style";
function ProgressChartEnergy() {
  const data = {
    labels: ["Run", ""],
    data: [0, 1],
  };
  const chartConfig = {
    backgroundColor: Colors.primary200,
    backgroundGradientFrom: Colors.primary400,
    backgroundGradientTo: Colors.primary500,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const screenWidth = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
      <ProgressChart
        style={styles.ProgressChart}
        data={data}
        width={370}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </View>
  );
}
export default ProgressChartEnergy;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ProgressChart: {
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 20,
    padding: 10,
    color: "#000",
  },
});
