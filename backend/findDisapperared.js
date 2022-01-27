const findDisapperared = function (nums) {
  const tmpObj = {};
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    tmpObj[nums[i]] = i;
  }
  console.log(tmpObj);

  for (let j = 0; j < nums.length; j++) {
    if (tmpObj[j + 1] === undefined) {
      result.push(j + 1);
    }
  }

  return result;
};

const nums = [4, 3, 2, 7, 8, 2, 3, 1];
console.log(findDisapperared(nums));
