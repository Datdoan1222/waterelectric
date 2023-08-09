import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { Colors } from "../contant/style";
import Bill from "../component/Ui/Bill";
import ErrorOverLay from "../component/Ui/Handle/ErrorOverLay";
import LoadingOverlay from "../component/Ui/Handle/LoadingOverLay";
import { fetchRealtime } from "../util/firebaseFunctions";
import { currentDates } from "../util/Date";
import { calculateElectric, calculateWater } from "../util/Calculate";

function MenuScreen() {
  const [day, setDay] = useState();
  const [isBill, setIsBill] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [electricBill, setElectricBill] = useState(0);
  const [waterBill, setWaterBill] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [dataDayElectric, setDataDayElectric] = useState([]);
  const [dataDayWater, setDataDayWater] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { dataDayElectric, dataDayWater } = await fetchRealtime();
        setDataDayElectric(dataDayElectric);
        setDataDayWater(dataDayWater);
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

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);

    // Find the data for the selected date in dataDayElectric and dataDayWater
    const electricData = dataDayElectric.find(
      (data) => data.timestamp === day.dateString
    );
    const waterData = dataDayWater.find(
      (data) => data.timestamp === day.dateString
    );

    // Calculate the electric and water bills
    if (electricData) {
      const electricBillValue = calculateElectric(electricData.value);
      calculateElectricBill(electricBillValue);
    } else {
      calculateElectricBill(0);
    }

    if (waterData) {
      const waterBillValue = calculateWater(waterData.value);
      calculateWaterBill(waterBillValue);
    } else {
      calculateWaterBill(0);
    }

    setIsBill(true);
  };
  const calculateWaterBill = (waterUsage) => {
    const waterBillValue = calculateWater(waterUsage);
    setWaterBill(waterBillValue);
  };

  // Calculate electric bill based on the electricity usage value
  const calculateElectricBill = (electricUsage) => {
    const electricBillValue = calculateElectric(electricUsage);
    setElectricBill(electricBillValue);
  };
  const today = new Date().toISOString().split("T")[0];
  return (
    <ScrollView style={styles.container}>
      <Calendar
        style={{
          borderWidth: 1,
          borderColor: "gray",
          margin: 10,
          borderRadius: 25,
          padding: 10,
          elevation: 4,
        }}
        current={today}
        onDayPress={handleDayPress}
        markedDates={{
          [today]: { selected: true, marked: true, selectedColor: "blue" },
        }}
      />
      <View style={styles.content}>
        {isBill && (
          <Bill
            totalEnergy
            waterToday={waterBill}
            electricToday={electricBill}
            date={selectedDate}
          />
        )}
      </View>
    </ScrollView>
  );
}

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1f1f1",
    marginTop: 40,
  },
  content: {
    marginVertical: 10,
    marginBottom: 80,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  Power: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 15,
    elevation: 4,
    marginBottom: 10,
  },
  titleContent: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    color: Colors.primary1000,
  },
  title: {
    color: Colors.primary1000,
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});
