import React from 'react';
import {useRef, useState, useEffect} from 'react';
import Header from './components/Header';
import PosterImage from './images/poster.webp'
import HitBox from './components/HitBox';
import characters from './data/characters.json'
import Intro from './components/Intro';
import Score from './components/Score';

import { db } from './firebase';
import {collection, addDoc} from 'firebase/firestore'

type CharacterType = {
  id:number
  name: string
  XCoords: number
  YCoords: number
  isMarked: boolean
}

function App() {
  const [data, setData] = useState<CharacterType[]>([])
  const [gameEnd, setGameEnd] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [counter, setCounter] = useState('00:00:00');
  const [formData, setFormData] = useState({name:''});
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const scoreCollectionRef = collection(db, 'Scores');

  useEffect(() => {
    setData(characters);
  },[])

  useEffect(()=>{
    const checkAllMarked = (data:CharacterType[]) => {
      return data.every(entry => entry.isMarked === true)
    }

    const allMarked = checkAllMarked(data);
    setGameEnd(allMarked);

  },[data])

  useEffect(() => {
		let timer:number;
		let seconds = 0;

		if(gameStart && !gameEnd){
			timer = window.setInterval(() => {
				seconds +=1
				const date = new Date(0);
				date.setSeconds(seconds);
				const result = date.toISOString().slice(11, 19);
				setCounter(result);
			}, 1000)
		}
		return () => {
			clearInterval(timer);
		}
	}, [gameStart, gameEnd])

  
  const startGame = () => {
    setGameStart(true);
  }

  const markCharacter = (id:number, name:string) => {
    setData(prevData => {
      return prevData.map(character => {
        return character.id === id ? {...character, isMarked:true} : character;
      })
    })
  }

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const {name, type, checked, value} = event.target;
    setFormData(prevData => {
      return{...prevData,
        [name]: type === 'checkbox' ? checked : value
      }
    })
  }

  const submitScore = () =>{
    addDoc(scoreCollectionRef, {score: counter, name: formData.name})

    setScoreSubmitted(true);
  }

  const resetGame = () =>{
    setData(characters);
    setGameStart(false);
    setGameEnd(false);
    setScoreSubmitted(false);
    setFormData({name:''})
    setCounter('00:00:00')
  }

  const boxElements = data.map(character => {
    return(
      <HitBox
        id={character.id}
        name={character.name}
        XCoordinate={character.XCoords}
        YCoordinate={character.YCoords}
        isMarked={character.isMarked}
        markCharacter={() => markCharacter(character.id, character.name)}
        
      />
    );
  })
  
  return(
    <div>
      {gameEnd === false ? <div className='app'>
        {!gameStart && <Intro
          startGame={startGame}
        />}
        <Header
          characterData={data}
          counter={counter}
        />
        <img src={PosterImage} alt="" width="100%" id="poster"/>
        {boxElements}
      </div> : 
      <Score
        formData={formData}
        score={counter}
        handleChange={handleChange}
        handleSubmit={submitScore}
        resetGame={resetGame}
        scoreSubmitted={scoreSubmitted}
      />}
    </div>
  );

}
export default App;
