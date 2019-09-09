export function prepareGameDifficulty (difficulty) {
  switch (difficulty) {
  case 'hard':
    return 'Сложно'
  case 'easy':
    return 'Легко'
  default:
    return 'Неизвестно'
  }
}

export function prepareGameStatus (status) {
  switch (status) {
  case 'win':
    return 'Победа'
  case 'loose':
    return 'Проигрыш'
  case 'tie':
    return 'Ничья'
  default:
    return 'Неизвестный'
  }
}

export function prepareGameBoard (turns, lastTurn = null) {
  let board = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  if (turns.length > 0) {
    for (let index in turns) {
      if (lastTurn !== null && parseInt(index) === lastTurn) {
        break
      }
      board[turns[index].location] = turns[index].playerSign
    }
  }

  return { ...board }
}
