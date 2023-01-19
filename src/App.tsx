import React from 'react';
import {useRef, useState, useEffect} from 'react';
import Header from './components/Header';
import PosterImage from './images/poster.webp'
import HitBox from './components/HitBox';
import characters from './data/characters.json'


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

  const markCharacter = (id:number, name:string) => {
    setData(prevData => {
      return prevData.map(character => {
        return character.id === id ? {...character, isMarked:true} : character;
      })
    })

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
        <Header
          characterData={data}
        />
        <img src={PosterImage} alt="" width="100%" id="poster"/>
        {boxElements}
      </div> : <div>Game Over</div>}
    </div>
  );

}
export default App;
