function uniqueElements(A1, A2) {
  const setA1 = new Set(A1);
  const setA2 = new Set(A2);

  const result = [];

  for (let item of setA1) {
    if (!setA2.has(item)) {
      result.push(item);
    }
  }

  for (let item of setA2) {
    if (!setA1.has(item)) {
      result.push(item);
    }
  }

  return result;
}

const A1 = [1, 2, "a"];
const A2 = [1, 3, "b"];

console.log(uniqueElements(A1, A2));
