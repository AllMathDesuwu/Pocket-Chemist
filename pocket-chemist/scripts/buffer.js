const submitButton = document.querySelector('.submit');

function acidBaseEquation(pH, acidBool, eqConst, baseConc, acidConc){
    if (acidBool === 'Kb'){
        if (eqConst != 0){
            eqConst = Math.pow(10,-14)/eqConst;
        }
        else{
            alert('need more information!');
            return 'need information';
        }
    }
    if (eqConst != 0 && baseConc != 0&& acidConc != 0){
        document.bufferForm.pH.value = -1*Math.log10(eqConst) + Math.log10(baseConc/acidConc);
        return document.bufferForm.pH.value;
    }
    else if (baseConc != 0 && acidConc != 0 && pH != 0){
        document.bufferForm.eq_const.value = Math.pow(10, -1*(-1*Math.log10(baseConc) + Math.log10(acidConc) + pH));
        return document.bufferForm.eq_const.value;
    }
    else if (acidConc != 0 && pH != 0 && eqConst != 0){
        document.bufferForm.base_conc.value = Math.pow(10, Math.log10(acidConc) + Math.log10(eqConst) + pH);
        return document.bufferForm.base_conc.value;
    }
    else if (pH != 0 && eqConst != 0 && baseConc != 0){
        document.bufferForm.acid_conc.value = Math.pow(10, -1*(-1*Math.log10(baseConc) + Math.log10(eqConst) + pH));
        return document.bufferForm.acid_conc.value;
    }
    else{
        alert('need more information!');
        return 'need information';
    }
}

submitButton.addEventListener('click', function(){acidBaseEquation(document.bufferForm.pH.value, document.bufferForm.Kb_Ka.value, parsePow('' + document.bufferForm.eq_const.value), parsePow('' + document.bufferForm.base_conc.value), parsePow('' + document.bufferForm.acid_conc.value));
    console.log(acidBaseEquation(document.bufferForm.pH.value, document.bufferForm.Kb_Ka.value, parsePow('' + document.bufferForm.eq_const.value), parsePow('' + document.bufferForm.base_conc.value), parsePow('' + document.bufferForm.acid_conc.value)));
});
