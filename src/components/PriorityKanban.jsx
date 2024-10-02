import React, { useState, useEffect } from "react";
import { fetchData } from "../api/api";
import Add from "../assets/Add.svg";
import ThreeDotMenu from "../assets/3_dot_menu.svg";
import Card from "./Card";
import { kanbanPriority } from "../utils";

const checkIfExists = (list, obj) => {
	for (let i = 0; i <= 4; i++) {
		list[i].forEach((ele) => {
			if (ele === obj) {
				return true;
			}
		});
	}
	return false;
};

const PriorityKanban = ({ data, ordering }) => {
	const [priorityTickets, setPriorityTickets] = useState({
		0: [],
		1: [],
		2: [],
		3: [],
		4: [],
	});
	const [users, setUsers] = useState([]);

	useEffect(() => {
		if (data?.tickets?.length > 0) {
			let tmpTickets = {
				0: [],
				1: [],
				2: [],
				3: [],
				4: [],
			};
			data.tickets.forEach((ticket) => {
				if (!checkIfExists(tmpTickets, ticket)) {
					tmpTickets[ticket.priority].push(ticket);
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
			setPriorityTickets(tmpTickets);
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

	console.log(priorityTickets);

	return (
		<div className="kanban-container">
			{kanbanPriority.map((ele, ind) => (
				<div className="grouped-col" key={ele.text}>
					<div className="grouped-col-header">
						<div className="grouped-col-icon-section">
							<img src={ele.icon} />
							<span>{ele.text}</span>
							<span>{priorityTickets[ind].length}</span>
						</div>
						<div className="grouped-col-icon-section">
							<img src={Add} />
							<img src={ThreeDotMenu} />
						</div>
					</div>
					<div className="grouped-col-container">
						{priorityTickets[ind].map((ticket, ind2) => (
							<Card
								key={ticket.id}
								id={ticket.id}
								tag={ticket.tag}
								title={ticket.title}
								priority={ticket.priority}
								status={ticket.status}
								userId={ticket.userId}
								users={users}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default PriorityKanban;
