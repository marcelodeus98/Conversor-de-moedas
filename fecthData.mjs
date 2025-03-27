import axios from "axios";

const apiURL = 'https://openexchangerates.org/api/currencies.json';

let cachedData = null;
let lastFetchTime = null;

export async function fetchData() {
    if (cachedData && lastFetchTime && (Date.now() - lastFetchTime < 30 * 60 * 1000)) {
        return cachedData;
    }

    try {
        const response = await axios.get(apiURL, {
            timeout: 5000,
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'CurrencyConverterApp/1.0'
            }
        });
        
        cachedData = response.data;
        lastFetchTime = Date.now();
        
        return cachedData;
    } catch(error) {
        console.error('Erro ao consumir API:', error);
        
        if (cachedData) {
            console.log('Retornando dados do cache devido ao erro');
            return cachedData;
        }
        
        return {
            "USD": "United States Dollar",
            "EUR": "Euro",
            "BRL": "Brazilian Real",
            "GBP": "British Pound Sterling",
            "JPY": "Japanese Yen"
        };
    }
}