// Creation and shuffling of deck

const makeDeck = () => {
  const newDeck = [];
  const suits = ['♦', '♣', '♥', '♠'];

  for (let i = 0; i < suits.length; i += 1) {
    let currentColor = '';
    if (suits[i] === '♦' || suits[i] === '♥') {
      currentColor = 'red';
    } else if (suits[i] === '♣' || suits[i] === '♠') {
      currentColor = 'black';
    }

    // have not initialsed currentEmoji yet
    const currentSuit = suits[i];
    for (let j = 1; j <= 13; j += 1) {
      let currentName = j;
      let currentStrength = j;
      if (j === 1) {
        currentName = 'Ace';
        currentStrength = 14;
      } else if (j === 11) {
        currentName = 'Jack';
      } else if (j === 12) {
        currentName = 'Queen';
      } else if (j === 13) {
        currentName = 'King';
      }
      const card = {
        name: currentName,
        suit: currentSuit,
        color: currentColor,
        strength: currentStrength,
      };
      newDeck.push(card);
    }
  }
  return newDeck;
};

const getRandomNumber = (max) => {
  const randomNumber = Math.floor(Math.random() * (max));
  return randomNumber;
};

const shuffleDeck = (newDeck) => {
  for (let i = 0; i < newDeck.length; i += 1) {
    const randomIndex = getRandomNumber(newDeck.length);
    const randomCard = newDeck[randomIndex];
    const currentCard = newDeck[i];
    newDeck[i] = randomCard;
    newDeck[randomIndex] = currentCard;
  }
  return newDeck;
};
