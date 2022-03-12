const clear = document.getElementById('clear');
const del = document.getElementById('delete');
const ansScreen = document.getElementById('ansScreen');
const topScreen = document.getElementById('topScreen');
const number = document.querySelectorAll('.number');
const operator = document.querySelectorAll('.operator');
const equal = document.getElementById('equal');
var numString = '0';
var secondNum = '-1';
var nums = 0;
var allowed = 'yes';
var cat = 'yes';
var ans = 0;

clear.onclick = () => {
    ansScreen.innerText = '0';
    topScreen.innerText = ' ';
    numString = '0';
    nums = 0;
    ans = 0;
    allowed = 'yes';
}

function perform(equation){
    symbols = ['+', '-', '*', '÷'];
    for(var i = 0; i<symbols.length; i++){
        var index = equation.indexOf(symbols[i]);
        if( index > 0){
            var operands = equation.split(symbols[i]);
            if(symbols[i] == '+'){
                ans = parseFloat(operands[0]) + parseFloat(operands[1]);
                numString = ans.toString();
            }
            else if(symbols[i] == '-'){
                ans = parseFloat(operands[0]) - parseFloat(operands[1]);
                numString = ans.toString();
            }
            else if(symbols[i] == '*'){
                ans = parseFloat(operands[0]) * parseFloat(operands[1]);
                numString = ans.toString();
            }
            else{
                ans = parseFloat(operands[0]) / parseFloat(operands[1]);
                numString = ans.toString();
            }
        }
    }
}

for (var i = 0 ; i < number.length; i++) {
    number[i].addEventListener('click', function(e){
        allowed = 'yes';
        if(ansScreen.innerText == '0' && e.target.innerText != '.'){
            ansScreen.innerText = e.target.innerText;

            numString = e.target.innerText;
        }
        else
        {
            numString = numString.concat(e.target.innerText);
            if(cat == 'yes'){
            ansScreen.innerText = ansScreen.innerText.concat(e.target.innerText);

            }
            else{
                ansScreen.innerText = e.target.innerText;
                cat = 'yes';
            }
        }

    } ) ; 
}

for (var i = 0 ; i < operator.length; i++) {
    operator[i].addEventListener('click', function(e){
        if(allowed == 'yes'){
            if(nums<1){
                nums+=1;
                numString = numString.concat(e.target.innerText);
                topScreen.innerText = numString;
                ansScreen.innerText = ''; 
                allowed = 'no';
            }
            else{
                perform(numString);
                ansScreen.innerText = '';
                cat = 'no';
                numString = numString.concat(e.target.innerText);
                topScreen.innerText = numString;
                nums = 1;
                allowed = 'no';
            }
        }
    } ) ; 
}

equal.addEventListener('click', function(){
    perform(numString);
    topScreen.innerText = ans;
    ansScreen.innerText = '';
    
})

del.addEventListener('click', function(e){
    if(ansScreen.innerText){
        ansScreen.innerText = ansScreen.innerText.slice(0, -1);
        numString = numString.slice(0,-1);
    }
    else{
        ansScreen.innerText = topScreen.innerText;
        topScreen.innerText = '';
    }
})