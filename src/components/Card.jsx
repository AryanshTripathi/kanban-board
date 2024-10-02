import React from "react";
import Avatar from "./Avatar";
import { kanbanStatus } from "../utils";

const findStatusIcon = (list, status) => {
	let res = "";
	list.forEach((ele) => {
		console.log(ele);
		if (ele.text === status) {
			res = ele.icon;
		}
	});
	return res;
};

const Card = ({ id, title, icon, status, tag, userId, users }) => {
	const statusIcon = findStatusIcon(kanbanStatus, status);
	console.log(statusIcon);
	let user = [];
	if (users?.length > 0) {
		user = users.filter((user) => user.id === userId);
	}
	return (
		<div className="card">
			<div className="header-container">
				<div className="header">{id}</div>
				{user.length > 0 && <Avatar name={user[0]?.name} />}
			</div>

			<div className="title-container">
				{/* <img src={statusIcon} /> */}
				<div className="title">{title}</div>
			</div>
			<div className="card-icon-container">
				{icon && (
					<div className="icon-section">
						<img src={icon} />
					</div>
				)}
				{tag?.map((individualTag) => (
					<div className="icon-section" key={individualTag}>
						<div className="circle"></div>
						<span>{individualTag}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default Card;
