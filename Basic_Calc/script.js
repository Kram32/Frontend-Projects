function insert(num){

    document.calculator.textview.value = document.calculator.textview.value+num;
}

function equal(){
   
   let exp = document.calculator.textview.value;
   if(exp){
    document.calculator.textview.value = eval(exp);
}
}

function c(){
    document.calculator.textview.value = "";
}

function back(){
    let exp = document.calculator.textview.value;
    document.calculator.textview.value = exp.substring(0,exp.length-1);
}

