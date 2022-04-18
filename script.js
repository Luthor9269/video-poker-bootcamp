let playerHand = [];
// gets a shuffledDeck using the two functions
let shuffledDeck = shuffleDeck(makeDeck());
// array to hold the clicked cards
let swappingCards = [];
let gameMode = 'bet';
// fake hands to test winning conditions
const fakeHandRoyalFlush = [{
  name: 10, suit: '♠', color: 'black', strength: 10,
}, {
  name: 'Jack', suit: '♠', color: 'black', strength: 11,
}, {
  name: 'Queen', suit: '♠', color: 'black', strength: 12,
}, {
  name: 'King', suit: '♠', color: 'black', strength: 13,
}, {
  name: 'Ace', suit: '♠', color: 'black', strength: 14,
}];

const fakeHandStraightFlush = [{
  name: 2, suit: '♦', color: 'red', strength: 2,
}, {
  name: 3, suit: '♦', color: 'red', strength: 3,
}, {
  name: 4, suit: '♦', color: 'red', strength: 4,
}, {
  name: 5, suit: '♦', color: 'red', strength: 5,
}, {
  name: 6, suit: '♦', color: 'red', strength: 6,
}];

const fakeHandFlush = [{
  name: 6, suit: '♦', color: 'red', strength: 2,
}, {
  name: 3, suit: '♦', color: 'red', strength: 3,
}, {
  name: 4, suit: '♦', color: 'red', strength: 4,
}, {
  name: 5, suit: '♦', color: 'red', strength: 5,
}, {
  name: 6, suit: '♦', color: 'red', strength: 6,
}];

const fakeHandfourOfAKind = [{
  name: 4, suit: '♦', color: 'red', strength: 2,
}, {
  name: 4, suit: '♦', color: 'red', strength: 3,
}, {
  name: 4, suit: '♦', color: 'red', strength: 4,
}, {
  name: 4, suit: '♦', color: 'red', strength: 5,
}, {
  name: 6, suit: '♦', color: 'red', strength: 6,
}];

const fakeHandthreeOfAKind = [{
  name: 4, suit: '♦', color: 'red', strength: 2,
}, {
  name: 4, suit: '♦', color: 'red', strength: 3,
}, {
  name: 4, suit: '♦', color: 'red', strength: 4,
}, {
  name: 5, suit: '♦', color: 'red', strength: 5,
}, {
  name: 6, suit: '♣', color: 'red', strength: 6,
}];

const fakeHandtwoPairs = [{
  name: 4, suit: '♦', color: 'red', strength: 2,
}, {
  name: 4, suit: '♦', color: 'red', strength: 3,
}, {
  name: 5, suit: '♦', color: 'red', strength: 4,
}, {
  name: 5, suit: '♦', color: 'red', strength: 5,
}, {
  name: 6, suit: '♣', color: 'red', strength: 6,
}];

const fakeHandpair = [{
  name: 4, suit: '♦', color: 'red', strength: 2,
}, {
  name: 4, suit: '♦', color: 'red', strength: 3,
}, {
  name: 8, suit: '♦', color: 'red', strength: 4,
}, {
  name: 5, suit: '♦', color: 'red', strength: 5,
}, {
  name: 6, suit: '♣', color: 'red', strength: 6,
}];

window.onload = function () {
  buildButtonFunctions();
  swappingFunction();
  calBet();
  disableButtons();
};

const buildButtonFunctions = () => {
  document.querySelector('.dealButton').addEventListener('click',
    () => {
      for (let i = 0; i < playerHand.length; i += 1) {
        const cardName = playerHand[i].name;
        const cardSuit = playerHand[i].suit;
        const suitColor = playerHand[i].color;
        const card = document.createElement('div');
        // adding color based on suit
        if (suitColor === 'red') {
          card.classList.add('red');
        } else (card.classList.add('black'));
        card.classList.add('card');
        card.innerText = `${cardName} \n ${cardSuit}`;
        const currentIndex = i;
        card.addEventListener('click', () => {
          swappingCards.push(currentIndex);
          card.classList.add('highlighted');
        });
        // make it so that the container empties every turn
        const cardPushContainer = document.querySelector('.cardsDisplay');
        cardPushContainer.appendChild(card);
        swappingCards.splice(currentIndex, 1);
      }
      gameMode = 'swap';
      disableButtons();
      showWinMessage('Choose the cards you want to change and click swap');
    });
  document.querySelector('.restartButton').addEventListener('click', () => {
    // function to reset all the values
    showWinMessage('New Round. How much more do you want to lose? Gambling addiction is a serious issue 🌚');
    restartGame();
    startOfGame();
  });
};

// function that swaps the cards when swap button is pressed
// after restarting its swapping the indexes selected previously as well
const swappingFunction = () => {
  document.querySelector('.swapButton').addEventListener('click', () => {
    for (let i = 0; i < swappingCards.length; i += 1) {
      const currentCardIndex = swappingCards[i];
      playerHand.splice(currentCardIndex, 1);
      const newCard = shuffledDeck.pop();
      playerHand.splice(currentCardIndex, 0, newCard);
    }
    // it adds the new playerHand into the innerHTML need to remove the innerHTML
    const cardPushContainer = document.querySelector('.cardsDisplay');
    // removes the innerHTML at the cardsDisplay
    cardPushContainer.innerText = '';
    for (let i = 0; i < playerHand.length; i += 1) {
      const cardName = playerHand[i].name;
      const cardSuit = playerHand[i].suit;
      const suitColor = playerHand[i].color;
      const card = document.createElement('div');
      // adding color based on suit
      if (suitColor === 'red') {
        card.classList.add('red');
      } else (card.classList.add('black'));
      card.classList.add('card');
      card.innerText = `${cardName} \n ${cardSuit}`;
      const currentIndex = i;
      card.addEventListener('click', () => {
        swappingCards.push(currentIndex);
        card.classList.add('highlighted');
      });
      // pushing the card into card in cardDisplay
      cardPushContainer.appendChild(card);
    }
    swappingCards = [];
    resetVariablesForSwap();
    checkWin();
    gameMode = 'restart';
    disableButtons();
  });
};

const startOfGame = () => {
  shuffledDeck = shuffleDeck(makeDeck());
  // draw 5 cards for player hand
  for (let i = 0; i < 5; i += 1) {
    playerHand.push(shuffledDeck.pop());
  }
};

// resetting function to restart the game
/// /////checkWin is having issues after restarting
const restartGame = () => {
  playerHand = [];
  shuffledDeck = [];
  document.querySelector('.cardsDisplay').innerText = '';
  gameMode = 'bet';
  resetVariablesForSwap();
  disableButtons();
};

// function to disable buttons when in another mode
const disableButtons = () => {
  const dealButton = document.querySelector('.dealButton');
  const swapButton = document.querySelector('.swapButton');
  const restartButton = document.querySelector('.restartButton');
  const betButtons = document.querySelectorAll('.betButton');

  if (gameMode === 'bet') {
    // making sure the other buttons are disabled
    betButtons.forEach((element) => {
      element.disabled = false;
    });
    dealButton.disabled = true;
    swapButton.disabled = true;
    restartButton.disabled = true;
  } else if (gameMode === 'deal') {
    dealButton.disabled = false;
    swapButton.disabled = true;
    restartButton.disabled = true;
    betButtons.forEach((element) => {
      element.disabled = true;
    });
  } else if (gameMode === 'swap') {
    dealButton.disabled = true;
    swapButton.disabled = false;
    restartButton.disabled = true;
    betButtons.forEach((element) => {
      element.disabled = true;
    });
  } else if (gameMode === 'restart') {
    dealButton.disabled = true;
    swapButton.disabled = true;
    restartButton.disabled = false;
    betButtons.disabled = true;
    betButtons.forEach((element) => {
      element.disabled = true;
    });
  }
};

// betting function
const calBet = () => {
  const bet1 = document.querySelector('.bet1');
  const bet2 = document.querySelector('.bet2');
  const bet3 = document.querySelector('.bet3');
  const bet4 = document.querySelector('.bet4');
  const bet5 = document.querySelector('.bet5');

  bet1.addEventListener('click', () => {
    currentBet = 1;
    console.log(`current bet:${currentBet}`);
    const creditDisplay = document.querySelector('.credit');
    creditDisplay.innerText = `Credit: ${playerCredit}`;
    document.querySelector('.bet2Display').classList.remove('choosenBet');
    document.querySelector('.bet3Display').classList.remove('choosenBet');
    document.querySelector('.bet4Display').classList.remove('choosenBet');
    document.querySelector('.bet5Display').classList.remove('choosenBet');
    document.querySelector('.bet1Display').classList.add('choosenBet');
    gameMode = 'deal';
    disableButtons();
    showWinMessage(`You bet ${currentBet}. Click Deal to show your hand`);
  });

  bet2.addEventListener('click', () => {
    currentBet = 2;
    console.log(`current bet:${currentBet}`);
    const creditDisplay = document.querySelector('.credit');
    creditDisplay.innerText = `Credit: ${playerCredit}`;
    document.querySelector('.bet1Display').classList.remove('choosenBet');
    document.querySelector('.bet3Display').classList.remove('choosenBet');
    document.querySelector('.bet4Display').classList.remove('choosenBet');
    document.querySelector('.bet5Display').classList.remove('choosenBet');
    document.querySelector('.bet2Display').classList.add('choosenBet');
    gameMode = 'deal';
    disableButtons();
    showWinMessage(`You bet ${currentBet}. Click Deal to show your hand`);
  });

  bet3.addEventListener('click', () => {
    currentBet = 3;
    console.log(`current bet:${currentBet}`);
    const creditDisplay = document.querySelector('.credit');
    creditDisplay.innerText = `Credit: ${playerCredit}`;
    document.querySelector('.bet1Display').classList.remove('choosenBet');
    document.querySelector('.bet2Display').classList.remove('choosenBet');
    document.querySelector('.bet4Display').classList.remove('choosenBet');
    document.querySelector('.bet5Display').classList.remove('choosenBet');
    document.querySelector('.bet3Display').classList.add('choosenBet');
    gameMode = 'deal';
    disableButtons();
    showWinMessage(`You bet ${currentBet}. Click Deal to show your hand`);
  });

  bet4.addEventListener('click', () => {
    currentBet = 4;
    console.log(`current bet:${currentBet}`);
    const creditDisplay = document.querySelector('.credit');
    creditDisplay.innerText = `Credit: ${playerCredit}`;
    document.querySelector('.bet1Display').classList.remove('choosenBet');
    document.querySelector('.bet2Display').classList.remove('choosenBet');
    document.querySelector('.bet3Display').classList.remove('choosenBet');
    document.querySelector('.bet5Display').classList.remove('choosenBet');
    document.querySelector('.bet4Display').classList.add('choosenBet');
    gameMode = 'deal';
    disableButtons();
    showWinMessage(`You bet ${currentBet}. Click Deal to show your hand`);
  });

  bet5.addEventListener('click', () => {
    currentBet = 5;
    console.log(`current bet:${currentBet}`);
    const creditDisplay = document.querySelector('.credit');
    creditDisplay.innerText = `Credit: ${playerCredit}`;
    document.querySelector('.bet1Display').classList.remove('choosenBet');
    document.querySelector('.bet2Display').classList.remove('choosenBet');
    document.querySelector('.bet3Display').classList.remove('choosenBet');
    document.querySelector('.bet4Display').classList.remove('choosenBet');
    document.querySelector('.bet5Display').classList.add('choosenBet');
    gameMode = 'deal';
    disableButtons();
    showWinMessage(`You bet ${currentBet}. Click Deal to show your hand`);
  });
  // close the rest of the buttons
  // changed game mode and reset disabled buttons
};

// function to push message into winMessage container
const showWinMessage = (message) => {
  const container = document.querySelector('.winMessage');
  container.innerText = message;
};

startOfGame();
