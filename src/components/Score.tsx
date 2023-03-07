import { useState, useEffect } from 'react'
import { db } from '../firebase'
import {collection, onSnapshot} from 'firebase/firestore'

type ScoreType = {
	formData: {name:string}
	score:string
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void
	resetGame:(event: React.MouseEvent<HTMLButtonElement>) => void
	scoreSubmitted: boolean
}


export default function Score(props:ScoreType) {
	const [scoreList, setScoreList] = useState<any>([])
	const scoreCollectionRef = collection(db, 'Scores');


	useEffect(() =>{
    const getScores = async() =>{
      await onSnapshot(scoreCollectionRef, (scores) =>{
				const temp = scores.docs.map((score) => ({...score.data()}))
				const sorted = (temp.sort((a,b) => a.score.localeCompare(b.score)))
				setScoreList(sorted)
      })
    }

    getScores();
	},[]);

	const scoreData = scoreList.map((score: {name: string , score:string}, index:number) => {
		const rank = index + 1;
		return(
			<tr>
				<td>{rank}</td>
				<td>{score.name}</td>
				<td>{score.score}</td>
			</tr>
		);
	})


	return (
		<div className="leaderboards">
			{!props.scoreSubmitted ? 
				<div className="score-form">
					<h1>You finished in {props.score}</h1>
					<input
						type="text"
						name="name"
						placeholder="Enter Your Name"
						value={props.formData.name}
						onChange={(e) => {props.handleChange(e)}}
					/>
					<button onClick={props.handleSubmit} className="submit-score">Submit Score</button>
				</div> 
				: 
				<div className="score-form">
					<h1>Thank you for Playing!</h1>
					<button onClick={props.resetGame} className="try-again">Try Again</button>
				</div>
			}
				<div className="player-scores">
					<table>
						<tr>
							<th>Rank</th>
							<th>Name</th>
							<th>Time</th>
						</tr>
						{scoreData}
					</table>
				</div>
		</div>
	)
}
