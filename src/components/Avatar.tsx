import React from 'react'

type AvatarType = {
	name:string
	isMarked:boolean
}

export default function Avatar(props:AvatarType) {
	const styles={
		opacity: props.isMarked ? '30%' : '100%'
	}
	return (
		<div style={styles} className="avatar">
			<img src={require(`../images/${props.name}.png`)} alt="" />
			<p>{props.name}</p>
		</div>
	)
}
