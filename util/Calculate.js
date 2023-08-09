// Giá tiền điện và nước (theo bậc và mức giá)
const electricPrices = [1.728, 1.786, 2.074, 2.612, 2.919, 3.015];
const waterPrices = [6.7, 12.9, 14.4];
// Tính tiền điện
export function calculateElectric(kWh) {
  let electricBill = 0;
  for (let i = 0; i < electricPrices.length; i++) {
    if (kWh <= 50) {
      electricBill += kWh * electricPrices[i];
      break;
    } else {
      electricBill += 50 * electricPrices[i];
      kWh -= 50;
    }
  }
  return electricBill.toFixed(3);
}

// Tính tiền nước
export function calculateWater(m3) {
  let waterBill = 0;
  for (let i = 0; i < waterPrices.length; i++) {
    if (m3 <= 4) {
      waterBill += m3 * waterPrices[i];
      break;
    } else {
      waterBill += 4 * waterPrices[i];
      m3 -= 4;
    }
  }
  return waterBill.toFixed(3);
}
