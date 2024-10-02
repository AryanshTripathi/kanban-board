import Backlog from "../assets/Backlog.svg";
import Cancelled from "../assets/Cancelled.svg";
import Done from "../assets/Done.svg";
import InProgress from "../assets/InProgress.svg";
import Todo from "../assets/Todo.svg";

import NoPriority from "../assets/Nopriority.svg";
import LowPriority from "../assets/LowPriority.svg";
import MediumPriority from "../assets/MediumPriority.svg";
import HighPriority from "../assets/HighPriority.svg";
import UrgentPriorityColor from "../assets/UrgentPriorityColor.svg";
import UrgentPriorityGrey from "../assets/UrgentPriorityGrey.svg";

export const kanbanPriority = [
	{
		icon: NoPriority,
		text: "No Priority",
	},
	{
		icon: LowPriority,
		text: "Low Priority",
	},
	{
		icon: MediumPriority,
		text: "High Priority",
	},
	{
		icon: HighPriority,
		text: "Medium Priority",
	},
	{
		icon: UrgentPriorityColor,
		text: "Urgent Priority",
		cardIcon: UrgentPriorityGrey,
	},
];

export const kanbanStatus = [
	{
		icon: Backlog,
		text: "Backlog",
	},
	{
		icon: Todo,
		text: "Todo",
	},
	{
		icon: InProgress,
		text: "In progress",
	},
	{
		icon: Done,
		text: "Done",
	},
	{
		icon: Cancelled,
		text: "Cancelled",
	},
];
