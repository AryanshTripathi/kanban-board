// const API_BASE_URL = import.meta.env.API_BASE_URL;
const API_BASE_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

export const fetchData = async () => {
	const response = await fetch(API_BASE_URL);

	if (!response.ok) {
		throw new Error(`Response Status: ${response.status}`);
	}

	try {
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return { error };
	}
};
