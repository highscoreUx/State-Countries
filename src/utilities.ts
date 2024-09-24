export const getCountryByName = async (name: string) => {
	try {
		const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
		const data = await response.json();
		return data;
	} catch (error: any) {
		alert(error?.message);
	}
};
