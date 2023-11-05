import React from "react";
import Die from "./components/Die";
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

function App() {

  const min = 1
  const max = 6

  const generateNewDie = () => {
    let newValue = Math.floor(Math.random() * (max - min) + min)
    return {
      value: newValue, 
      isHeld: false, 
      id: nanoid()
    }
  }

  const allNewDice = () => {
    let newDice = []
    for (let i=0; i<10; i++){
      newDice[i] = generateNewDie()
    }
    return newDice
  }

  const [dice, setDice] = React.useState(() => allNewDice())

  const holdDice = (id) => {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElements = dice.map(die => {
    return (
      // id as parameter mustn't be passed down completely
      <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>
    )})

  const [rolls, setRolls] = React.useState(0)

  const rollDice = () => {
    if(tenzies){
      // restart game
      setRolls(0)
      setTenzies(false)
      setDice(allNewDice())
    } else {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
      setRolls(prev => prev +1)
    }
  }

  // represents whether use has won the game or not
  const [tenzies, setTenzies] = React.useState(false)

  // check if user has one
  // state 'tenzies' relies on state 'dice' -> need to keep in synch -> useEffect needed
  React.useEffect(
    () =>  {
      // checks if 1) all dice are being held 2) all have the same value
      let first = dice[0].value
      setTenzies(
        dice.every( die => {
          return die.isHeld && die.value === first
        }
      ))
    }, [dice]
  )

  return (
    <div className="App">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <button className="roll-button" onClick={rollDice}> {tenzies ? "New Game" : "Roll"}</button>
        <p>Rolls so far: {rolls}</p>
      </main>
    </div>
  );
}

export default App;
