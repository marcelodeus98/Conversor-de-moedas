
let Converter = async () => {
    try{
        
        let valueCoin = parseFloat(document.getElementById("valueId").value) || 1;
        let coinOne = document.getElementById("selectMoedaOne").value.split(',')[0];
        let coinTwo = document.getElementById("selectMoedaTwo").value.split(',')[0];
        let elementConvertido = document.getElementById("valueConvert");
    
        const app_URL = `https://economia.awesomeapi.com.br/${coinOne}-${coinTwo}/1`;
        
         const response = await fetch(app_URL);
            if (!response.ok) {
                throw new Error('Erro ao consumir API');
            }

        const data = await response.json();
        const valueConverted = data[0].low * valueCoin;  

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: coinTwo,
        });
          
        elementConvertido.innerHTML = `O valor convertido é : ${formatter.format(valueConverted)}`;
    }
    catch(error) {
        console.error('Erro ao conveter moeda:', error);
    }
}
