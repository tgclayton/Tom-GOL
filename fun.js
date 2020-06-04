const array = [3]
array.push(1)
console.log(array)

const availableCards = [0,1,2,3...]

function getRandomCard(data, options){
const idx = options[Math.floor((Math.random() * action.currentCards.length))]
return data[idx]
}

updateCard() {
  const {randomCard, endOfDeck, seenCards, cardData, setEndOfDeck, availableCards} = this.props
  const card = getRandomCard(cardData)
  availableCards = availableCards.filter(idx => idx !== card.id)
  this.props.setAvailableCards(availableCards)
  const atEnd = endOfDeck || (cardData.length === seenCards.length + 1)
  setEndOfDeck(atEnd)
  return card
}