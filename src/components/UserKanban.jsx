import React, { useState, useEffect } from "react";
import { fetchData } from "../api/api";
import Avatar from "./Avatar";
import Add from "../assets/Add.svg";
import ThreeDotMenu from "../assets/3_dot_menu.svg";
import Card from "./Card";
import { kanbanPriority } from "../utils";

const checkIfExists = (list, obj) => {
	const id = ["usr-1", "usr-2", "usr-3", "usr-4", "usr-5"];
	for (let i = 0; i <= 4; i++) {
		list[id[i]].forEach((ele) => {
			if (ele === obj) {
				return true;
			}
		});
	}
	return false;
};

const UserKanban = ({ data, ordering }) => {
	const [users, setUsers] = useState([]);
	const [userTickets, setUserTickets] = useState({
		"usr-1": [],
		"usr-2": [],
		"usr-3": [],
		"usr-4": [],
		"usr-5": [],
	});

	useEffect(() => {
		if (data?.tickets?.length > 0) {
			let tmpTickets = {
				"usr-1": [],
				"usr-2": [],
				"usr-3": [],
				"usr-4": [],
				"usr-5": [],
			};
			data.tickets.forEach((ticket) => {
				if (!checkIfExists(tmpTickets, ticket)) {
					tmpTickets[ticket.userId].push(ticket);
				}
			});

			if (ordering === "priority") {
				for (const prop in tmpTickets) {
					tmpTickets[prop].sort((a, b) => b.priority - a.priority);
				}
			} else {
				for (const prop in tmpTickets) {
					tmpTickets[prop].sort((a, b) => {
						const nameA = a?.title.toUpperCase(); // ignore upper and lowercase
						const nameB = b?.title.toUpperCase(); // ignore upper and lowercase
						if (nameA < nameB) {
							return -1;
						}
						if (nameA > nameB) {
							return 1;
						}

						// names must be equal
						return 0;
					});
				}
			}

			setUserTickets(tmpTickets);
		}

		if (data?.users?.length > 0) {
			let tmpUsers = [];
			data.users.forEach((user) => {
				tmpUsers.push({
					id: user.id,
					name: user.name,
					available: user.available,
				});
			});
			setUsers(tmpUsers);
		}
	}, [data, ordering]);

	console.log(userTickets);
	console.log(users);

	return (
		<div className="kanban-container">
			{users.map((ele, ind) => (
				<div className="grouped-col" key={ele.id}>
					<div className="grouped-col-header">
						<div className="grouped-col-icon-section">
							<Avatar name={ele.name} />
							<span>{ele.name}</span>
							<span>{userTickets[ele.id].length}</span>
						</div>
						<div className="grouped-col-icon-section">
							<img src={Add} />
							<img src={ThreeDotMenu} />
						</div>
					</div>
					<div className="grouped-col-container">
						{userTickets[ele.id].map((ticket, ind2) => (
							<Card
								key={ticket.id}
								id={ticket.id}
								tag={ticket.tag}
								title={ticket.title}
								priority={ticket.priority}
								status={ticket.status}
								userId={ticket.userId}
								icon={
									kanbanPriority[ticket.priority].cardIcon ||
									kanbanPriority[ticket.priority].icon
								}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default UserKanban;
