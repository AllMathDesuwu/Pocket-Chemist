function parsePow(value){
    let i;
    let newPow = '';
    let powBase = '';
    let newEqConst;
    for (i = 0; i < value.length; i++){
        if (value.slice(i, i+1) != 'E')
            powBase+=value.slice(i,i+1);
        else
            break;
    }
    for (let j = i+1; j < value.length; j++){
        newPow+=value.slice(j,j+1);
    }
    if (newPow === '')
        newPow = 0;
    newEqConst = powBase * Math.pow(10,Number(newPow));
    return newEqConst;
}

//console.log(parsePow('0.1'));