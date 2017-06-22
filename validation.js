const formatMsg = (error, entry = [], description) => {
  return ['\x1b[41m', error, '\x1b[0m\x1b[32m', entry.join(':'), '\x1b[0m', description];
};

const validateBet = (bet = []) => {
  // Bet:<product>:<selections>:<stake>
  // <product> is one of "W", "P", "E"
  if (bet[1] !== 'W' && bet[1] !== 'P' && bet[1] !== 'E') {
    return {
      valid: false,
      msg: formatMsg('Incorrect Bet product:', bet, 'Bet:<product>:<selections>:<stake>. Product should contain value W, P or E')
    };
  };

  let validSelection;

  if (bet[1] === 'W' || bet[1] === 'P') {
    // <selections> is either single runner number...
    validSelection = Number.isInteger(+bet[2]);
  } else {
    //... or two runner numbers
    const numbers = bet[2].split(',');
    validSelection = numbers.length === 2 && Number.isInteger(+numbers[0]) && Number.isInteger(+numbers[1]);
  }

  if (!validSelection) {
    return {
      valid: false,
      msg: formatMsg('Incorrect Bet selections:', bet, 'Bet:<product>:<selections>:<stake>. Please note that <selections> is either single runner number (W,P) or two runner numbers (E)')
    };
  }

  // <stake> is amount in whole dollars
  const validStake = Number.isInteger(+bet[3]);

  if (!validStake) {
    return {
      valid: false,
      msg: formatMsg('Incorrect Bet stake:', bet, 'Bet:<product>:<selections>:<stake>. <stake> is amount in whole dollars')
    };
  }

  return { valid: true };
}

const validateResult = (result = []) => {
  // Result:<first>:<second>:<third>
  const firstValid = Number.isInteger(+result[1]);
  const secondValid = Number.isInteger(+result[2]);
  const thirdValid = Number.isInteger(+result[3]);
  const isValid = firstValid && secondValid && thirdValid;

  if (isValid) {
    return { valid: true };
  } else {
    return {
      valid: false,
      msg: formatMsg('Incorrect Result', result, 'should contain 3 numbers')
    }
  }

}

const validate = (entry = []) => {
  // All inputs contain of 4 components divided with ":"
  if (entry.length !== 4) {
    return {
      valid: false,
      msg: formatMsg('Incorrect format:', entry, 'should contain 4 components divided with ":"')
    };
  }

  // All inputs are of type "Bet" or "Result"
  if (entry[0] === 'Bet') {
    return validateBet(entry);
  } else if (entry[0] === 'Result') {
    return validateResult(entry);
  }

  // Input is not of type "Bet" or "Result"
  return {
    valid: false,
    msg: formatMsg('Incorrect type:', entry, 'input should be of type "Bet" or "Result"')
  }
}

export default validate;
