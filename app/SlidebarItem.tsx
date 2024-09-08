import React from "react";

interface Props {
	name: string;
	active: boolean;
	handleClick: (val: any) => void;
}

const SidebarItem = ({ name, active, handleClick }: Props) => {
	return (
		<button
			className={`sidebar-item ${active ? "active" : ""}`}
			onClick={handleClick}
		>
			{name}
		</button>
	);
};

export default SidebarItem;
