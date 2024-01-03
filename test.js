// const finalFunc = inp => {
//   const inputs = inp.split('\n');
//   const testCases = inputs[0];

//   for (let i = 1; i <= testCases; i++) {
//     const n = testCases[i];
//     function findMultiplesOf12(num) {
//       if (num % 12 === 0) num = num - 1;
//       const belowN = Math.floor(num / 12) * 12;
//       const aboveN = Math.ceil(num / 12) * 12;
//       return {belowN, aboveN};
//     }

//     const {belowN: low, aboveN: high} = findMultiplesOf12(n);
//     const mid = (high + low) / 2;
//     let oppositeSeatNumber;
//     const arrangeMent = [
//       'WS',
//       'MS',
//       'AS',
//       'AS',
//       'MS',
//       'WS',
//       'WS',
//       'MS',
//       'AS',
//       'AS',
//       'MS',
//       'WS',
//     ];

//     if (n > mid) {
//       const rem = n - mid;
//       oppositeSeatNumber = mid - rem + 1;
//     } else {
//       const rem = mid - n;
//       oppositeSeatNumber = mid + rem + 1;
//     }
//     const seatType = arrangeMent[(n % 12) - 1] || arrangeMent[0];
//     console.log(oppositeSeatNumber, seatType);
//   }
// };

// const getSeatNumber = seat => {
//   const seat_type = ['WS', 'WS', 'MS', 'AS', 'AS', 'MS', 'WS', 'WS'];
//   const seat_berth = Math.ceil(seat / 12);
//   const facing_seat = 13 + (seat_berth - 1) * 24 - seat;
//   console.log(facing_seat, seat_type[7 - (facing_seat % 6)]);
// };

// getSeatNumber(7);

const powerOfNum = (n, m) => {
  if (m === 0) {
    return 1;
  }

  return n * powerOfNum(n, m - 1);
};

console.log(powerOfNum(2, 4));
