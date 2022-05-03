let Converter = () => {
    let valueId = document.getElementById("valueId");
    let valueMoeda = parseFloat(valueId.value);
    let selectMoedaOne = document.getElementById("selectMoedaOne");
    let selectMoedaTwo = document.getElementById("selectMoedaTwo");
    let valueSelectOne = selectMoedaOne.value;
    let valueSelectTwo = selectMoedaTwo.value;
    let elementConvertido = document.getElementById("valueConvert");
    console.log(elementConvertido)
   

    if(valueSelectOne === 'EURO' || valueSelectTwo ==='REAL'){
        let obterValue = valueMoeda*5.24;
        let valueFinal = obterValue.toFixed(2);
        let passValueConvertido = `O valor convertido é : ${valueFinal}`
        elementConvertido.innerHTML = passValueConvertido;
    }

    if(valueSelectOne === 'EURO' || valueSelectTwo ==='DOLAR'){
        let obterValue = valueMoeda*1.10;
        let valueFinal = obterValue.toFixed(2);
        let passValueConvertido = `O valor convertido é : ${valueFinal}`
        elementConvertido.innerHTML = passValueConvertido;

    }

    if(valueSelectOne === 'REAL' || valueSelectTwo ==='DOLAR'){
        let obterValue = valueMoeda*0.21;
        let valueFinal = obterValue.toFixed(2);
        let passValueConvertido = `O valor convertido é : ${valueFinal}`
        elementConvertido.innerHTML = passValueConvertido;

    }

    if(valueSelectOne === 'REAL' || valueSelectTwo ==='EURO'){
        let obterValue = valueMoeda*0.19;
        let valueFinal = obterValue.toFixed(2);
        let passValueConvertido = `O valor convertido é : ${valueFinal}`
        elementConvertido.innerHTML = passValueConvertido;
    }

    if(valueSelectOne === 'DOLAR' || valueSelectTwo ==='REAL'){
        let obterValue = valueMoeda*4.77;
        let valueFinal = obterValue.toFixed(2);
        let passValueConvertido = `O valor convertido é : ${valueFinal}`
        elementConvertido.innerHTML = passValueConvertido;

    }

    if(valueSelectOne === 'DOLAR' || valueSelectTwo ==='EURO'){
        let obterValue = valueMoeda*0.91;
        let valueFinal = obterValue.toFixed(2);
        let passValueConvertido = `O valor convertido é : ${valueFinal}`
        elementConvertido.innerHTML = passValueConvertido;

    }
}