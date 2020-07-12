import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export default class API {
    // get data for cards component
	static async getCardData(country) {
		let targetUrl = url;

		if (country) {
			targetUrl = `${url}/countries/${country}`;
		}

		try {
			const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(targetUrl);

			return { confirmed, recovered, deaths, lastUpdate };
		} catch (error) {
			return error;
		}
	}

    // get daily data for chart component (this data only available in `world / global` option, individual countries don't have it in the API)
	static async getDailyData() {
		try {
			const { data } = await axios.get(`${url}/daily`);

			return data.map(({ confirmed, deaths, recovered, reportDate: date }) => ({
				confirmed: confirmed.total,
				deaths: deaths.total,
				recovered: recovered.total,
				date,
			}));
		} catch (error) {
			return error;
		}
	}

    // get list of countries for selection form (CountryPicker)
	static async getCountries() {
		try {
			const { data: { countries } } = await axios.get(`${url}/countries`);

			return countries.map((country) => country.name);
		} catch (error) {
			return error;
		}
	}

	// get news article for corona in the news section
	static async getNews() {
		try {
			const API_KEY = `b0b15a2bb3f9473eb9e356b671d061df`;
			const response = await axios.get(`https://newsapi.org/v2/everything?q=corona-virus&languasortBy=publishedAt&language=en&apiKey=${API_KEY}`);
			return response.data.articles;
		} catch (error) {
			return error;
		}
	}
}