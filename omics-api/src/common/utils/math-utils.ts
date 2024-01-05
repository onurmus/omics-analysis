export const calcMean = (numberList: number[]) => {
  if (!numberList.length) return;
  return numberList.reduce((acc, val) => acc + val, 0) / numberList.length;
};

export const calcMedian = (numberList: number[]) => {
  if (!numberList.length) return;
  const sortedNumbers = numberList.slice().sort((a, b) => a - b);
  const middle = Math.floor(sortedNumbers.length / 2);

  if (sortedNumbers.length % 2 === 0) {
    return (sortedNumbers[middle - 1] + sortedNumbers[middle]) / 2;
  } else {
    return sortedNumbers[middle];
  }
};

export const calcVariance = (numberList: number[], meanValue?: number) => {
  if (!numberList.length) return;
  meanValue = meanValue ?? calcMean(numberList);
  return (
    numberList.reduce((acc, val) => acc + Math.pow(val - meanValue, 2), 0) /
    numberList.length
  );
};
