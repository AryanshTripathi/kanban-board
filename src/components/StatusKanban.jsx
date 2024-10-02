import React, { useState, useEffect } from "react";
import { fetchData } from "../api/api";
import Add from "../assets/Add.svg";
import ThreeDotMenu from "../assets/3_dot_menu.svg";
import { kanbanStatus, kanbanPriority } from "../utils";
import Card from "./Card";

const checkIfExists = (list, obj) => {
	const status = ["Todo", "In progress", "Backlog", "Cancelled", "Done"];
	for (let i = 0; i <= 4; i++) {
		list[status[i]].forEach((ele) => {
			if (ele === obj) {
				return true;
			}
		});
	}
	return false;
};

const StatusKanban = ({ data, ordering }) => {
	const [users, setUsers] = useState([]);
	const [statusTickets, setStatusTickets] = useState({
		Todo: [],
		"In progress": [],
		Backlog: [],
		Cancelled: [],
		Done: [],
	});

	useEffect(() => {
		if (data?.tickets?.length > 0) {
			let tmpTickets = {
				Todo: [],
				"In progress": [],
				Backlog: [],
				Cancelled: [],
				Done: [],
			};
			data.tickets.forEach((ticket) => {
				if (!checkIfExists(tmpTickets, ticket)) {
					tmpTickets[ticket.status].push(ticket);
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

			setStatusTickets(tmpTickets);
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

	return (
		<div className="kanban-container">
			{kanbanStatus.map((ele, ind) => (
				<div className="grouped-col" key={ele.text}>
					<div className="grouped-col-header">
						<div className="grouped-col-icon-section">
							<img src={ele.icon} />
							<span>{ele.text}</span>
							<span>{statusTickets[ele.text].length}</span>
						</div>
						<div className="grouped-col-icon-section">
							<img src={Add} />
							<img src={ThreeDotMenu} />
						</div>
					</div>
					<div className="grouped-col-container">
						{statusTickets[ele.text].map((ticket, ind2) => (
							<Card
								icon={
									kanbanPriority[ticket.priority].cardIcon ||
									kanbanPriority[ticket.priority].icon
								}
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

export default StatusKanban;
