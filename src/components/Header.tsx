import React from 'react'
import { useEffect, useState } from 'react'
import { setInterval } from 'timers/promises'
import Avatar from './Avatar'

type HeaderType = {
	characterData: {
		name:string
		isMarked:boolean
	}[]
	counter:string
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
				<div className="timer"><h1>{props.counter}</h1></div>
			</div>

		</header>
	)
}
