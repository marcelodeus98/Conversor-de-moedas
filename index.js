let Converter = () => {
    let valueId = document.getElementById("valueId");
    let valueMoeda = parseFloat(valueId.value);
    let selectMoedaOne = document.getElementById("selectMoedaOne");
    let selectMoedaTwo = document.getElementById("selectMoedaTwo");
    let valueSelectOne = selectMoedaOne.value;
    let valueSelectTwo = selectMoedaTwo.value;
    let elementConvertido = document.getElementById("valueConvert");

    if(valueSelectOne == 'EURO' && valueSelectTwo == 'REAL'){
        let valueFinal = valueMoeda*5.24
        let passValueConvertido = `O valor convertido é : ${valueFinal}`
        elementConvertido.innerHTML = passValueConvertido;
    }

    if(valueSelectOne == 'EURO' && valueSelectTwo == 'DOLAR'){
        let valueFinal = valueMoeda*1.10
        let passValueConvertido = `O valor convertido é : ${valueFinal}`
        elementConvertido.innerHTML = passValueConvertido;
    }
   

    if(valueSelectOne == 'REAL' && valueSelectTwo ==='DOLAR'){
        let valueFinal = valueMoeda*0.21
        let passValueConvertido = `O valor convertido é : ${valueFinal}`
        elementConvertido.innerHTML = passValueConvertido;

    }

    if(valueSelectOne == 'REAL' && valueSelectTwo == 'EURO'){
        let valueFinal = valueMoeda*0.19
        let passValueConvertido = `O valor convertido é : ${valueFinal}`
        elementConvertido.innerHTML = passValueConvertido;
    }

    if(valueSelectOne == 'DOLAR' && valueSelectTwo == 'REAL'){
        let valueFinal = valueMoeda*4.77
        let passValueConvertido = `O valor convertido é : ${valueFinal}`
        elementConvertido.innerHTML = passValueConvertido;

    }

    if(valueSelectOne == 'DOLAR' &&  valueSelectTwo == 'EURO'){
        let valueFinal = valueMoeda*0.91
        let passValueConvertido = `O valor convertido é : ${valueFinal}`
        elementConvertido.innerHTML = passValueConvertido;

    }
}