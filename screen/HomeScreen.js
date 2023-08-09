import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import { ref, onValue } from "firebase/database";

import { Colors, styles } from "../contant/style";
import ItemStatistical from "../component/energy/ItemStatistical";
import Energy from "../component/energy/Energy";
import ChildMenu from "../component/Ui/TimeMenu";
import ErrorOverLay from "../component/Ui/Handle/ErrorOverLay";
import LoadingOverlay from "../component/Ui/Handle/LoadingOverLay";
import { fetchRealtime } from "../util/firebaseFunctions";
import { currentDates } from "../util/Date";
import { calculateElectric, calculateWater } from "../util/Calculate";
function HomeScreen({ navigation }) {
  const [data, setData] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const [warningWater, setWarningWater] = useState(false);
  const [warningEletric, setWarningElectric] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          labelWater,
          dataWater,
          labelElectricity,
          dataElectricity,
          electricIndexMax,
          waterIndexMax,
        } = await fetchRealtime();
        // element data month
        const newMonth = currentDates.month;
        const waterIndex = labelWater.indexOf(newMonth);
        const electriIndex = labelElectricity.indexOf(newMonth);

        let dataMonth = null;
        if (waterIndex !== -1 && electriIndex !== -1) {
          dataMonth = {
            monthWater: dataWater[waterIndex],
            monthElectri: dataElectricity[electriIndex],
          };
        }
        // Sum data month
        const sumWater = dataWater.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        const sumElectricity = dataElectricity.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        let sumData = null;
        if (sumWater !== -1 && sumElectricity !== -1) {
          sumData = {
            yearDataWater: sumWater,
            yearDataElectricity: sumElectricity,
          };
        }
        // set Warning
        const warningWater = dataWater[waterIndex] > waterIndexMax;
        const warningEletric = dataElectricity[electriIndex] > electricIndexMax;
        setWarningWater(warningWater);
        setWarningElectric(warningEletric);
        setYear(sumData);
        setMonth(dataMonth);
        setData({
          labels: labelElectricity,
          datasets: [
            {
              data: dataWater,
              color: (opacity = 1) => `rgba(0, 0, 128, ${opacity})`, // Màu của đường năng suất nước
              strokeWidth: 3, // Độ đậm của đường
            },
            {
              data: dataElectricity,
              color: (opacity = 1) => `rgba(255, 149, 0, ${opacity})`, // Màu của đường năng suất điện
              strokeWidth: 3, // Độ đậm của đường
            },
          ],
          legend: ["WaterPower(m³)           ", "ElectricalPower(kWh)"],
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError("Error fetching data", error);
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
  const yearDataWater = year.yearDataWater;
  const yearDataElectricity = year.yearDataElectricity;
  const monthWater = month.monthWater;
  const monthElectri = month.monthElectri;

  const electricBill = calculateElectric(monthElectri);
  const waterBill = calculateWater(monthWater);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.menu}>
          <View style={styles.menuIndex}>
            <Text style={styles.title}>Today</Text>
            <Text style={[styles.index, styles.indexx]}>
              {monthElectri} <Text style={styles.index}>kWh</Text>
            </Text>
            <Text style={styles.index}>{monthWater} m³</Text>
          </View>
          <View style={[styles.menuRow, styles.row]}>
            <ChildMenu title="Week" childIndex="12.07" index="100" />
            <ChildMenu
              title="Month"
              childIndex={monthElectri}
              index={monthWater}
            />
            <ChildMenu
              title="Year"
              childIndex={yearDataElectricity}
              index={yearDataWater}
            />
          </View>
        </View>
        <View style={styles.content}>
          <Energy dataEnergy={data} />
          <View style={[styles.row]}>
            <ItemStatistical
              warning={true}
              icon="energy"
              name="ElectricalPower"
              index={monthElectri}
              unit="kWh"
              totalMoney={electricBill}
              onPress={() => {
                navigation.navigate("ElectricalPower", {
                  totalMoney: electricBill,
                  iswarning: true,
                });
              }}
            />
            <ItemStatistical
              warning={warningWater}
              ionicon
              icon="water-outline"
              name="WaterPower"
              index={monthWater}
              unit="m³"
              totalMoney={waterBill}
              onPress={() => {
                navigation.navigate("WaterPower", {
                  totalMoney: waterBill,
                  iswarning: warningWater,
                });
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
export default HomeScreen;
