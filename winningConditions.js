let cardNameTally = {};
let cardSuitTally = {};
let cardStrengthTally = {};

// used for checkWin
let cardDuplicates = false;
let flush = false;
let runningSequence = false;
let fourOfAKind = false;
let tripleDouble = false;
let threeOfAKind = false;
let twoPairs = false;
let pair = false;
let royalFlush = false;
let currentSuit = '';

// used for the betting function
let playerCredit = 100;
// eslint-disable-next-line prefer-const
let currentBet = 0;
let currentWin = 0;

const calStrengthTally = (playerHand) => {
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardStrength = playerHand[i].strength;
    if (cardStrength in cardStrengthTally) {
      cardStrengthTally[cardStrength] += 1;
    }
    else {
      cardStrengthTally[cardStrength] = 1;
    }
  } return cardStrengthTally;
};

// creates a object that counts repeats in cards to be used for checkWin
const calNameTally = (playerHand) => {
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardName = playerHand[i].name;
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
      cardDuplicates = true;
    }
    else {
      cardNameTally[cardName] = 1;
    }
  }
  return cardNameTally;
};

const calSuitTally = (playerHand) => {
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardSuit = playerHand[i].suit;
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }
    else {
      cardSuitTally[cardSuit] = 1;
    }
  }
  return cardSuitTally;
};

// function to check running sequence
// uses cardDuplicate GV,calStrengthTally
const calRunningSequence = () => {
  // get an array of all the values in the object
  const values = Object.keys(cardStrengthTally);
  // finding the max in the array
  const max = Math.max(...values);
  // finding the min in the array
  const min = Math.min(...values);
  // getting the difference between max and min
  const difference = max - min;
  // need to ensure there are no duplicate cards if not it will return true sometimes
  if ((difference === 4) && (cardDuplicates === false)) {
    runningSequence = true;
  }
  if (runningSequence === true && min === 10) {
    royalFlush = true;
  }
};

// function to check if there is flush
// uses flushGV, cardSuitTally
const checkSuits = () => {
  // getting all the values from the suitsTally that shows number of suits
  const suitValues = Object.values(cardSuitTally);
  // finding the max from the values of suits
  const max = Math.max(...suitValues);
  // if max is 5 means there are 5 same suits
  if (max === 5) {
    const suit = Object.keys(cardSuitTally);
    currentSuit = suit;
    flush = true;
  }
};

// function to check if there are 4 of a kind
// uses cardnameTally
const calFourOfAKind = () => {
  const cardNameValues = Object.values(cardNameTally);
  const max = Math.max(...cardNameValues);
  if (max === 4) {
    fourOfAKind = true;
  }
};

// function to check if there is FULL HOUSE
// checsk for THREEOFAKIND
// checks for two pairs
// checks for pair
// uses cardnameTally
const caltripleDouble = () => {
  // getting the values for all cards inside cardname
  // use to check if there are triples and doubles
  const nameValue = Object.values(cardNameTally);
  const nameValueLength = nameValue.length;
  // find max and min
  // if max and min are 3 and 2 then its a triple double
  const max = Math.max(...nameValue);
  const min = Math.min(...nameValue);
  // set global variable tripledouble to true
  if (max === 3 && min === 2) {
    tripleDouble = true;
    // checking for three of a kind
  } else if (max === 3) {
    // changing GV threeofakind to true if max 3 and min not 2
    threeOfAKind = true;
    // checking for two pairs
  } else if (max === 2 && nameValueLength === 3) {
    twoPairs = true;
  }
  // checking for pair
  else if (max === 2) {
    pair = true;
  }
};

const calPayout = () => {
  console.log(currentWin);
  playerCredit = playerCredit - currentBet + currentWin;
  document.querySelector('.credit').innerText = `Credit: ${playerCredit}`;
  currentWin = 0;
};

// function to reset all the variables
const resetVariablesForSwap = () => {
  cardNameTally = {};
  cardSuitTally = {};
  cardStrengthTally = {};

  // used for checkWin
  cardDuplicates = false;
  flush = false;
  runningSequence = false;
  fourOfAKind = false;
  tripleDouble = false;
  threeOfAKind = false;
  twoPairs = false;
  pair = false;
  royalFlush = false;
  currentSuit = '';
};

// need to include the points into winning conditions
const checkWin = () => {
  calNameTally(playerHand);
  calSuitTally(playerHand);
  calStrengthTally(playerHand);
  checkSuits();
  calRunningSequence();
  calFourOfAKind();
  caltripleDouble();
  // check for straight flush

  if (royalFlush === true && flush === true) {
    const message = 'You got ROYAL FLUSH! \n Click restart to try again!';
    currentWin = currentBet * 250;
    showWinMessage(message);
  }
  else if (runningSequence === true && flush === true) {
    const message = 'You got a STRAIGHT FLUSH! \n Click restart to try again!';
    currentWin = currentBet * 50;
    showWinMessage(message);
  }
  // check for 4 of a kind
  else if (fourOfAKind === true) {
    const message = 'You got 4 of a kind! \n Click restart to try again!';
    currentWin = currentBet * 25;
    showWinMessage(message);
  }
  // check for tripleDouble
  else if (tripleDouble === true) {
    const message = 'You got FULL HOUSE! \n Click restart to try again!';
    currentWin = currentBet * 9;
    showWinMessage(message);
  }
  // check for flush same suit
  else if (flush === true) {
    const message = 'You got a FLUSH! \n Click restart to try again!';
    currentWin = currentBet * 6;
    showWinMessage(message);

    // check for straight running sequence
  } else if (runningSequence === true && cardDuplicates === false) {
    const message = 'You got a STRAIGHT! \n Click restart to try again!';
    currentWin = currentBet * 4;
    showWinMessage(message);
  }
  // check for three of a kind
  else if (threeOfAKind === true) {
    const message = 'You got 3 of a kind! \n Click restart to try again!';
    currentWin = currentBet * 3;
    showWinMessage(message);
  }
  // check for two pairs
  else if (twoPairs === true) {
    const message = 'You got TWO PAIRS! \n Click restart to try again!';
    currentWin = currentBet * 2;
    showWinMessage(message);
  }
  // check for pair
  else if (pair === true) {
    const message = 'You got a PAIR! \n Click restart to try again!';
    currentWin = currentBet * 1;
    showWinMessage(message);
  }
  else {
    const message = 'You got nothing \n Click restart to try again!';
    showWinMessage(message);
  }
  calPayout();
};
