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
  const bets = +map.get(winner) > 0 ? map.get(winner) : 1; // This line should follow some business rules - at this stage preventing division by 0;  
  const rounded = Math.round(total * 100 / bets);
  const result = Number.isFinite(rounded) ? rounded / 100 : 0;
  return result;
}
