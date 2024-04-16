const convertions = {
    'EUR-BRL': 5.24,
    'EUR-USD': 1.10,
    'BRL-USD': 0.19,
    'BRL-EUR': 0.19,
    'USD-BRL': 4.77,
    'USD-EUR': 4.77,
}

let Converter = () => {
    
    let valueMoeda = parseFloat(document.getElementById("valueId").value) || 1;
    let valueSelectOne = document.getElementById("selectMoedaOne").value;
    let valueSelectTwo = document.getElementById("selectMoedaTwo").value;
    let elementConvertido = document.getElementById("valueConvert");

    if(valueSelectOne === valueSelectTwo) return;

    const rate = convertions[`${valueSelectOne}-${valueSelectTwo}`];
    const convertedValue = valueMoeda * rate;
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: valueSelectTwo,
    });
    elementConvertido.innerHTML = `O valor convertido é : ${formatter.format(convertedValue)}`;
}