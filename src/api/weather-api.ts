import { VariableType } from "../assets/types";

export const WeatherAPI = {
    baseUrl: 'https://api.open-meteo.com',

	async getWeatherData(lat: string, long: string, variables: VariableType[]) {
		try {
            return await fetch(`${this.baseUrl}/v1/forecast?latitude=${lat}&longitude=${long}&daily=${variables.join(',')}&timezone=Europe/Moscow&past_days=0`,
                { method: 'GET' })
                .then(res => {
                    if (res.status < 300) {
                        return res.json();
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(res => res);
        } catch (e) {
            return console.log('Failed:', e);
        }
	}
}