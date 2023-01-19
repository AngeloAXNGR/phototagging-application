import React from 'react'
import Avatar from './Avatar'

type HeaderType = {
	characterData: {
		name:string
		isMarked:boolean
	}[]
}

export default function Header(props:HeaderType) {
	const avatars = props.characterData.map(data => {
		return(
			<Avatar 
				name={data.name}
				isMarked={data.isMarked}
			/>
		)
	})
	return (
		<header>
			<div className="top-header">
				<div className="avatars">{avatars}</div>
				<div className="timer">1 Mins 59 Seconds</div>
			</div>
			<div className="bottom-header"></div>
		</header>
	)
}
