import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, Image } from "react-native";
import moment from "moment";
import { Colors } from "../contant/style";
import Energy from "../component/energy/Energy";
import GoBack from "../component/Ui/GoBack";
import Bill from "../component/Ui/Bill";
import ErrorOverLay from "../component/Ui/Handle/ErrorOverLay";
import LoadingOverlay from "../component/Ui/Handle/LoadingOverLay";
import {
  fetchElectricityRealtime,
  fetchRealtime,
} from "../util/firebaseFunctions";
import PowerDetailsScreen from "./PowerDetailsScreen";

function ElectricalPower({ navigation, route }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const { totalMoney, iswarning } = route.params;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { labelElectricity, dataElectricity } = await fetchRealtime();

        setData({
          labels: labelElectricity,
          datasets: [
            {
              data: dataElectricity,
              color: (opacity = 1) => `rgba(255, 149, 0, ${opacity})`, // Màu của đường năng suất nước
              strokeWidth: 3, // Độ đậm của đường
            },
          ],
          legend: ["ElectricalPower(kWh)"],
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
      title="ElectricalPower"
      dataEnergy={data}
      goback={goback}
      content="Lượng điện sử dụng đã quá mức !!!"
    />
  );
}
export default ElectricalPower;
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
    marginTop: 150,
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
    color: "#E7B987",
    fontSize: 30,
    marginVertical: 10,
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
