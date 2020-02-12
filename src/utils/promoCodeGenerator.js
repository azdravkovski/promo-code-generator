const sumDigits = num => {
  const sum = num.map(digit => parseInt(digit)).reduce((acc, n) => acc + n);
  return sum;
};

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
    let multiplied = multiplyEachDigit(num);
    let summed = sumDigits(multiplied);
    let checked = checkIfDivisibleBy11(summed);
    return checked;
  }
  return false;
};

const generatePromoCodes = (amount = 1) => {
  const promoCodesSet = [];

  while (promoCodesSet.length + 1 <= amount) {
    let promoCode = "";
    for (let i = 0; i < 9; i++) {
      promoCode += Math.floor(Math.random() * 10).toString();
    }

    if (validateNumber(promoCode) && promoCodesSet.indexOf(promoCode) === -1) {
      promoCodesSet.push(promoCode);
    }
  }

  return {
    promoCodes: promoCodesSet
  };
};

module.exports = generatePromoCodes;
