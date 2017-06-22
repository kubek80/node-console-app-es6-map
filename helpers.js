const getTotal = (map = new Map(), commission) => {
  let sum = 0;
  for (let k of map.values()) {
    sum += k;
  }

  const minusCommission = sum - (sum * commission / 100);
  return minusCommission;
}

export const add = (map = new Map(), key, value) => {
  const currentValue = map.has(key) ? map.get(key) : 0;
  let newMap = new Map([...map]);
  newMap.set(key, currentValue + +value);
  return newMap;
}

export const getYield = (map = new Map(), winner, commission, divider = 1) => {
  const total = getTotal(map, commission) / divider;
  const bets = map.get(winner);
  const rounded = Math.round(total * 100 / bets);
  return rounded / 100;
}
