import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GoBack from "../component/Ui/GoBack";
import { Colors } from "../contant/style";
import Energy from "../component/energy/Energy";
import Bill from "../component/Ui/Bill";
import ErrorOverLay from "../component/Ui/Handle/ErrorOverLay";
import LoadingOverlay from "../component/Ui/Handle/LoadingOverLay";
import { fetchRealtime } from "../util/firebaseFunctions";
import PowerDetailsScreen from "./PowerDetailsScreen";

function WaterPower({ navigation, route }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const { totalMoney, iswarning } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { labelWater, dataWater } = await fetchRealtime();

        setData({
          labels: labelWater,
          datasets: [
            {
              data: dataWater,
              color: (opacity = 1) => `rgba(0, 0, 128, ${opacity})`, // Màu của đường năng suất nước
              strokeWidth: 3, // Độ đậm của đường
            },
          ],
          legend: ["WaterPower(m³) "],
        });
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  if (error && !isLoading) {
    return <ErrorOverLay message={error} />;
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }

  function goback() {
    navigation.goBack();
  }
  return (
    <PowerDetailsScreen
      totalMoney={totalMoney}
      iswarning={iswarning}
      title="WaterPower"
      dataEnergy={data}
      goback={goback}
      content="Lượng nước sử dụng đã quá mức !!!"
    />
  );
}
export default WaterPower;
