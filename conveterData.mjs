import axios from "axios";

export async function convertCoin(coinOne, coinTwo, value) {
    try {
        const app_URL = `https://economia.awesomeapi.com.br/${coinOne}-${coinTwo}/1`
        const response = await axios.get(app_URL);
        const data = response.data[0].low;
        const valueConverted = data * value;

        return valueConverted;
    }
    catch( error ){
        console.error('Erro ao consumir API:', error);
        return []
    };
};



