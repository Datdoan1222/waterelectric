import { ref, onValue } from "firebase/database";
import { db } from "../util/firebase";

export const fetchRealtime = () => {
  const sleepRef = ref(db, "/realtime/electricLog");
  const waterRef = ref(db, "/realtime/waterLog");
  const categoryRef = ref(db, "/category");
  const dateElectricRef = ref(db, "/date/electric");
  const dateWaterRef = ref(db, "/date/water");

  return new Promise((resolve, reject) => {
    // Initialize data variables
    let dataElectricity = [];
    let labelElectricity = [];
    let dataWater = [];
    let labelWater = [];
    let electricIndexMax, waterIndexMax;
    let dateElectric = [];
    let dateWater = [];
    let dataDayElectric = [];
    let dataDayWater = [];

    // Helper function to check if all data fetching is complete
    const checkComplete = () => {
      if (
        dataElectricity.length > 0 &&
        labelElectricity.length > 0 &&
        dataWater.length > 0 &&
        labelWater.length > 0 &&
        typeof electricIndexMax !== "undefined" &&
        typeof waterIndexMax !== "undefined" &&
        dateElectric.length > 0 &&
        dateWater.length > 0 &&
        dataDayElectric.length > 0 && // Ensure dataDayElectric has been populated
        dataDayWater.length > 0 // Ensure dataDayWater has been populated
      ) {
        resolve({
          labelElectricity,
          dataElectricity,
          labelWater,
          dataWater,
          electricIndexMax,
          waterIndexMax,
          dateElectric,
          dateWater,
          dataDayElectric,
          dataDayWater,
        });
      }
    };

    // Fetch electricity data
    onValue(
      sleepRef,
      (electricSnapshot) => {
        const electricData = electricSnapshot.val();

        // Extract electricity data from the snapshot
        Object.keys(electricData).forEach((monthKey) => {
          const monthData = electricData[monthKey];
          labelElectricity.push(monthData.month);
          dataElectricity.push(monthData.value);
        });

        checkComplete();
      },
      reject
    );

    // Fetch water data
    onValue(
      waterRef,
      (waterSnapshot) => {
        const waterData = waterSnapshot.val();

        // Extract water data from the snapshot
        Object.keys(waterData).forEach((monthKey) => {
          const monthData = waterData[monthKey];
          labelWater.push(monthData.month);
          dataWater.push(monthData.value);
        });

        checkComplete();
      },
      reject
    );

    // Fetch category data
    onValue(
      categoryRef,
      (categorySnapshot) => {
        const categoryData = categorySnapshot.val();

        // Extract electricindexmax and waterindexmax values
        electricIndexMax = categoryData.electricindexmax.value;
        waterIndexMax = categoryData.waterindexmax.value;

        checkComplete();
      },
      reject
    );

    // Fetch electric date data
    onValue(
      dateElectricRef,
      (dateElectricSnapshot) => {
        const dateElectricDataSnapshot = dateElectricSnapshot.val();

        // Extract electric date data from the snapshot
        dateElectric = Object.keys(dateElectricDataSnapshot).map((key) => {
          return {
            timestamp: key,
            value: dateElectricDataSnapshot[key],
          };
        });

        // Extract dataDayElectric
        dataDayElectric = Object.values(dateElectricDataSnapshot);

        checkComplete();
      },
      reject
    );

    // Fetch water date data
    onValue(
      dateWaterRef,
      (dateWaterSnapshot) => {
        const dateWaterDataSnapshot = dateWaterSnapshot.val();

        // Extract water date data from the snapshot
        dateWater = Object.keys(dateWaterDataSnapshot).map((key) => {
          return {
            timestamp: key,
            value: dateWaterDataSnapshot[key],
          };
        });

        // Extract dataDayWater
        dataDayWater = Object.values(dateWaterDataSnapshot);

        checkComplete();
      },
      reject
    );
  });
};
