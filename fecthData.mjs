import axios from "axios";

const apiURL = 'https://openexchangerates.org/api/currencies.json';

export async function fetchData() {
    try {
        const response = await axios.get(apiURL);
        return response.data;
    }
    catch( error ){
        console.error('Erro ao consumir API:', error);
        return []
    };
};
