import React from "react";

type Props = {
	min: number;
	max: number;
	value: number;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Slider = ({ min, max, value, handleChange }: Props) => {
	return (
		<div className="slider-container">
			<input
				type="range"
				className="slider"
				min={min}
				max={max}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
};

export default Slider;
