import React, { useState } from "react";
import useFecth from "./hooks";

const App: React.FC = () => {
	const [countryName, setCountryName] = useState("");
	const [country, setCountry] = useState("USA");
	const { data, isLoading, setData, setisLoading } = useFecth(country);
	console.log(data);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setisLoading(true);
		try {
			const response = await fetch(
				`https://restcountries.com/v3.1/name/${country}`
			);
			const data = await response.json();
			setData(data);
		} catch (error: any) {
			console.log(error);
		} finally {
			setisLoading(false);
		}
	};

	if (isLoading) {
		return <h1>Loading</h1>;
	}

	//todo: take note of capitalization
	return (
		<div className="flex">
			<div className="flip">
				<div className="box">
					<div className="img-box">
						<img
							src={data && data[0]?.flags?.png}
							alt={data && data[0]?.flags.alt}
						/>
					</div>
					<hr />
					<div>
						<h1>{data && data[0]?.name?.official}</h1>

						{data &&
							data[0]?.continents?.map((continent, indexs) => {
								return <p key={indexs}>{continent}</p>;
							})}
						<div className="wrap">
							<p>👬</p>
							<p>{data && data[0]?.population.toLocaleString()}</p>
						</div>
						<div className="wrap">
							<p>🗣️</p>
							<p>
								{data.length > 0 &&
									(() => {
										const key = Object.keys(data[0]?.languages)[0];
										return data[0].languages[key];
									})()}
							</p>
						</div>
						<div className="wrap">
							<p>💶</p>
							<p>
								{data.length > 0 && Object.keys(data[0]?.currencies)}
								{/* {data && Object.keys(data[0]?.currencies)},{" "} */}
								{/* {data && data[0].currencies.currencyKey.symbol} */}
							</p>
						</div>
					</div>
				</div>
				<div className="box">
					<div className="img-box">
						<img src={data && data[0]?.coatOfArms?.png} alt={"Coat of Arm"} />
					</div>
					<div>
						<div className="wrap">
							<p>🏛️</p>
							<p>{data && data[0]?.capital[0]}</p>
						</div>
						<div className="wrap">
							<p>🏄</p>
							<p>
								{data && data[0]?.latlng[0]}
								.00 Latitude, {data && data[0]?.latlng[1]}
								.00 Longitude
							</p>
						</div>
						<div className="wrap">
							<p>🌞</p>
							<p>{data && data[0]?.startOfWeek}</p>
						</div>
						<div className="wrap">
							<p>⏱️</p>
							<p>{data && data[0]?.timezones[0]}</p>
						</div>
						<div className="wrap">
							<p>😁</p>
							<p>{data && data[0]?.region}</p>
						</div>
						<div className="wrap">
							<p>✔️</p>
							<p>
								<span>
									<a href={data && data[0]?.maps.googleMaps} target="_blank">
										Map Link
									</a>
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<form className="formDetails" onSubmit={handleSubmit}>
					<input
						type="text"
						name="country"
						id="country"
						placeholder="Country name"
						value={countryName}
						onChange={(e) => {
							setCountryName(e.currentTarget.value);
							setCountry(e.currentTarget.value);
						}}
					/>
					<button type="submit" disabled={isLoading}>
						{isLoading ? "Getting Details" : "Get Details"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default App;
