import { useEffect, useState } from "react";

interface IData {
	flags: {
		alt: string;
		png: string;
		svg: string;
	};
	name: {
		official: string;
	};
	continents: string[];
	population: number;
	coatOfArms: {
		png: string;
	};
	capital: string[];
	latlng: number[];
	startOfWeek: string;
	timezones: string[];
	region: string;
	maps: {
		googleMaps: string;
	};
	currencies: {
		[key: string]: {
			name: string;
			symbol: string;
		};
	};
	languages: {
		[key: string]: string;
	};
}

/**
 * Fetches data from a publicApi
 * @param name
 * @returns
 */
const useFecth = (name: string) => {
	const [isLoading, setisLoading] = useState<boolean>(false);
	const [data, setData] = useState<IData[] | []>([]);

	useEffect(() => {
		const getData = async () => {
			setisLoading(true);
			try {
				const response = await fetch(
					`https://restcountries.com/v3.1/name/${name}`
				);
				const data = await response.json();
				setData(data);
			} catch (error: any) {
				console.log(error);
				alert(error?.message);
			} finally {
				setisLoading(false);
			}
		};

		getData();
	}, []);
	return { isLoading, data, setData, setisLoading };
};

export default useFecth;

export const useDebounce = (value: string, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};
