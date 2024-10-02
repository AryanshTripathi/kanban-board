import { useState, useEffect } from "react";
import "./App.css";
import { fetchData } from "./api/api";
import Card from "./components/Card";
import Display from "./assets/Display.svg";
import Down from "./assets/Down.svg";
import PriorityKanban from "./components/PriorityKanban";
import UserKanban from "./components/UserKanban";
import StatusKanban from "./components/StatusKanban";

function App() {
	const [data, setData] = useState([]);
	const [showDisplay, setShowDisplay] = useState(false);
	const [ordering, setOrdering] = useState("priority");
	const [grouping, setGrouping] = useState("status"); //Change to status

	useEffect(() => {
		let val = fetchData();
		val.then((res) => setData(res));
	}, []);

	// console.log(data);
	// console.log(grouping);
	// console.log(ordering);

	return (
		<div className="root">
			<div className="menu">
				<div className="display-icon-section">
					<img src={Display} />
					<span>Display</span>
					<img
						className="display-dropdown"
						src={Down}
						onClick={() => {
							setShowDisplay((prev) => !prev);
						}}
					/>
				</div>
				{showDisplay && (
					<div className="display-grid-container">
						<div className="grid-item">Grouping</div>
						<select
							value={grouping}
							className="grid-item"
							onChange={(e) => {
								setGrouping(e.target.value);
								setShowDisplay(false);
							}}>
							<option value="status">Status</option>
							<option value="user">User</option>
							<option value="priority">Priority</option>
						</select>
						<div className="grid-item">Ordering</div>
						<select
							value={ordering}
							className="grid-item"
							onChange={(e) => {
								setOrdering(e.target.value);
								setShowDisplay(false);
							}}>
							<option value="priority">Priority</option>
							<option value="title">Title</option>
						</select>
					</div>
				)}
			</div>
			<div className="container">
				{grouping === "priority" && (
					<PriorityKanban data={data} ordering={ordering} />
				)}
				{grouping === "user" && <UserKanban data={data} ordering={ordering} />}
				{grouping === "status" && (
					<StatusKanban data={data} ordering={ordering} />
				)}
			</div>
		</div>
	);
}

export default App;
