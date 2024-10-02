import React from "react";

const Avatar = ({ name }) => {
	let avatarName = "";
	let val = name.split(" ");
	if (val.length == 1) {
		for (let i = 0; i < Math.min(2, val[0].length); i++) {
			avatarName += val[0][i];
		}
	} else if (val.length == 2) {
		avatarName += val[0][0];
		avatarName += val[1][0];
	}
	return (
		<div className="avatar-container">
			<div className="avatar">{avatarName}</div>
			<div className="dot"></div>
		</div>
	);
};

export default Avatar;
