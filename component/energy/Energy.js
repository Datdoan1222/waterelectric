import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { Colors } from "../../contant/style";
import LoadingOverlay from "../Ui/Handle/LoadingOverLay";

function Energy({ dataEnergy, backgroundWarning }) {
  const defaultBackground = { backgroundColor: Colors.primary600 };
  const chartBackground = backgroundWarning || defaultBackground;
  return (
    <View style={styles.container}>
      {dataEnergy ? (
        <LineChart
          style={styles.lineChart}
          data={dataEnergy}
          width={370}
          height={220}
          yAxisInterval={1}
          withVerticalLines={false}
          chartConfig={{
            backgroundGradientFrom: chartBackground.backgroundColor,
            backgroundGradientTo: Colors.primary200,
            decimalPlaces: 0,
            color: () => Colors.gray,
            labelColor: () => Colors.black,
            legendFontSize: 28,
            style: {
              borderRadius: 16,
            },
            propsForLabels: {
              fontSize: 15,
            },
            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: Colors.primary900,
            },
          }}
          bezier
        />
      ) : (
        <View style={styles.loading}>
          <LoadingOverlay message="Updating chart!..." />
        </View>
      )}
    </View>
  );
}
export default Energy;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 2,
  },
  lineChart: {
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 20,
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary300,
    height: 250,
    width: 360,
    marginVertical: 10,
    borderRadius: 25,
  },
});
