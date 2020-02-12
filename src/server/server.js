const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", true);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

//Sums digits of 9-digit int
const sumDigits = num => {
  const sum = num.map(digit => parseInt(digit)).reduce((acc, n) => acc + n);
  return sum;
};

//Checks if sum of digits of int is divisible by 11
const checkIfDivisibleBy11 = num => {
  if (parseInt(num) % 11 === 0) {
    return true;
  }
  return false;
};

const multiplyEachDigit = num => {
  let multiplied = num
    .toString()
    .split("")
    .map((digit, i) => {
      return parseInt(digit) * (10 - (i + 1));
    });
  return multiplied;
};

const checkNumberLength = num => {
  if (num.toString().length === 9) {
    return true;
  }
  return false;
};

const hasMoreThanTwoSameDigits = n => {
  const digits = String(n).split("");
  const digitCounts = Object.values(
    digits.reduce(
      (acc, digit) => ({ ...acc, [digit]: (acc[digit] || 0) + 1 }),
      {}
    )
  );
  return Object.values(digitCounts).some(count => count > 2);
};

const validateNumber = num => {
  if (!hasMoreThanTwoSameDigits(num) && checkNumberLength(num)) {
    // console.log("Not more than two repeating digits: " + true)
    let multiplied = multiplyEachDigit(num);
    // console.log("Multiplied digits: " + multiplied);
    let summed = sumDigits(multiplied);
    // console.log("Sum of multiplied digits: " + summed);
    let checked = checkIfDivisibleBy11(summed);
    // console.log("Sum divisible by 11: " + checked);
    return checked;
  }
  // console.log("Not more than two repeating digits: " + false);
  return false;
};

const generatePromoCodes = (amount = 1) => {
  const batch = [];

  while (batch.length + 1 <= amount) {
    let promoCode = "";
    for (let i = 0; i < 9; i++) {
      promoCode += Math.floor(Math.random() * 10).toString();
    }

    if (validateNumber(promoCode) && batch.indexOf(promoCode) === -1) {
      batch.push(promoCode);
    }
  }

  return {
    promocodes: batch
  };
};

generatePromoCodes(1000);

app.get("/promocodes", (req, res) => res.send(generatePromoCodes(1000)));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
