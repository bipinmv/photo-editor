"use client";
import React, { useEffect, useRef, useState } from "react";
import Slider from "./Slider";
import SidebarItem from "./SlidebarItem";
import { DEFAULT_OPTIONS } from "./constants";

const Home = () => {
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
	const [options, setOptions] = useState(DEFAULT_OPTIONS);
	const [image, setImage] = useState("");
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const selectedOption = options[selectedOptionIndex];

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		if (file) {
			const reader = new FileReader();
			reader.onload = (event: any) => {
				setImage(event.target?.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDownload = () => {
		const canvas = canvasRef.current;
		const link = document.createElement("a");
		link.href = canvas?.toDataURL("image/png") ?? "";
		link.download = "altered-image.png";
		link.click();
	};

	const applyCSSFilters = (ctx: any, img: any) => {
		const filters = options.map(option => {
			return `${option.property}(${option.value}${option.unit})`;
		});
		ctx.filter = filters.join(" ");
		ctx.drawImage?.(
			img,
			0,
			0,
			canvasRef.current?.width,
			canvasRef.current?.height
		);
	};

	const drawImageOnCanvas = () => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d") ?? {};
		const img = new Image();
		img.src = image;
		img.onload = () => {
			applyCSSFilters(ctx, img);
		};
	};

	const handleSliderChange = ({ target }: any) => {
		setOptions(prevOptions => {
			return prevOptions.map((option, index) => {
				if (index !== selectedOptionIndex) return option;
				return { ...option, value: target.value };
			});
		});
	};

	useEffect(() => {
		if (image) {
			const canvas: any = canvasRef.current;
			const screenWidth = window.innerWidth;
			const screenHeight = window.innerHeight;

			canvas.width = screenWidth * 0.85;
			canvas.height = screenHeight * 0.8;

			drawImageOnCanvas();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [image]);

	return (
		<>
			<div className="container">
				<div className="main-image">
					{image ? (
						<canvas ref={canvasRef} />
					) : (
						<input type="file" accept="image/*" onChange={handleImageUpload} />
					)}
				</div>

				<div className="sidebar">
					{options.map((option, index) => {
						return (
							<SidebarItem
								key={option.property}
								name={option.name}
								active={index === selectedOptionIndex}
								handleClick={() => setSelectedOptionIndex(index)}
							/>
						);
					})}
					<div className="download">
						<button
							onClick={() => setOptions(DEFAULT_OPTIONS)}
							disabled={!image}
						>
							Reset
						</button>
						<button onClick={handleDownload} disabled={!image}>
							Download
						</button>
					</div>
				</div>
				<Slider
					min={selectedOption.range.min}
					max={selectedOption.range.max}
					value={selectedOption.value}
					handleChange={handleSliderChange}
				/>
			</div>
			{image && drawImageOnCanvas()}
		</>
	);
};

export default Home;
