import { useEffect, useState } from "react";
import styled from "styled-components";

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState("");
	const [temp, setTemp] = useState("");
	const [weather, setWeather] = useState("");

	useEffect(() => {
		fetch(
			"https://api.openweathermap.org/data/2.5/weather?q=NEFTEKAMSK&units=metric&lang=ru&appid=d93bc2d2453a3d1d003b3b71e1671658"
		)
			.then((data) => data.json())
			.then(({ name, weather, main }) => {
				setCity(name);
				setTemp(Math.round(main.temp));
				setWeather(weather[0].description);
			});
	}, []);
	return (
		<div className={className}>
			<div>
				<div>Блог веб-разработчика</div>
				<div>web@developer.ru</div>
			</div>
			<div>
				<div>
					{city},{" "}
					{new Date().toLocaleString("ru", {
						day: "numeric",
						month: "long",
					})}
				</div>
				<div>
					{temp} градусов, {weather}
				</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: bold;
	height: 120px;
	padding: 20px 40px;
	width: 1000px;
	background-color: rgb(255, 255, 255);
	box-shadow: rgb(0, 0, 0) 0px 2px 17px;
`;
