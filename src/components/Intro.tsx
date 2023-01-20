import React from 'react'

type IntroProps = {
	startGame: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Intro(props:any) {
	return (
		<div className="intro">
			<div className="filler"></div>
			<div className="intro-modal">
				<h2>
					Tag these characters as fast as you can. Characters that are tagged will be marked by a red circle with their name on it. Earn a spot in the top 10 by finishing the game as quickly as possible
				</h2>
				<div className="intro-posters">
					<img src={require(`../images/ToanPoster.png`)} alt="" />
					<img src={require(`../images/VelvetPoster.png`)} alt="" />
					<img src={require(`../images/TommyVercettiPoster.png`)} alt="" />
				</div>
				<button className="start-button" onClick={props.startGame}>Start Game</button>
			</div>
		</div>
	)
}
