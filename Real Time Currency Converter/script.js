let select = document.querySelectorAll('#currency');
let btn = document.getElementById('btn');
let input = document.getElementById('input');


fetch('https://api.frankfurter.app/currencies')
.then((msg) => msg.json())
.then((data) => displayDropDown(data))

function displayDropDown(data)
{
    let currData = Object.entries(data);
    for(let i=0;i<currData.length;i++)
    {
        let val = `<option value="${currData[i][0]}">${currData[i][0]}</option>`;
        select[0].innerHTML += val;
        select[1].innerHTML += val;
    }
}

btn.addEventListener('click',()=> {
    let currency1 = select[0].value;
    let currency2 = select[1].value;
    let inputValue = input.value;
    if(currency1 == currency2) alert("choose different currencies")
    else convert(currency1,currency2,inputValue);
})

function convert(currency1,currency2,inputValue)
{
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${inputValue}&from=${currency1}&to=${currency2}`)
    .then(resp => resp.json())
    .then((data) => {
        document.getElementById("result").value = Object.values(data.rates)[0];
    });
}