import React from 'react'

type HitBoxProps = {
	id:number
	name:string
	XCoordinate: number
	YCoordinate: number
	isMarked:boolean
	markCharacter: (event: React.MouseEvent<HTMLDivElement>) => void
}

export default function Box(props:HitBoxProps) {
	
	const styles = {
		border: props.isMarked ? "0.4vw solid red" : "none",
		top:`${props.YCoordinate}vw`,
		left:`${props.XCoordinate}vw`
	}

	return (
		<div className="hitbox" style={styles} onClick={props.markCharacter} >
			{props.isMarked &&  <h3>{props.name}</h3>}

		</div>
	)
}
