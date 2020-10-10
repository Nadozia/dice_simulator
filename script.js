var diceNumber = document.getElementById('dice-number')
var diceSum = document.getElementById('diceSum')
var btn = document.getElementById('check')
var Chart = require('chart.js');
var resultContainer = document.querySelector('.result-container')
var canvas = document.getElementById('myCanvas')

var count = 0;
var x,y = getInfo()

var myPlot = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
        labels: x,
        datasets: [{
            label: 'Probability Distribution of Dices',
            data: y,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    });

function getInfo(){
    var num = Number(diceNumber.value);
    var sum = Number(diceSum.value);
    var x = Array.from(Array(num), (_, i) => i+1);
    var y = Array();
    for (var c=1; c<=num; c++){
        y.push(rolldiceSumProb(sum,c))
    }
    return [x, y];
}

btn.addEventListener('click',()=>{
    if (validate()){
            var [x,y] = getInfo()
            updateChart(myPlot, x, y);
        }
    } 
)

function updateChart(chart, x, y){
    chart.data.labels = x;
    chart.data.datasets[0].data = y;
    chart.update();
}

function validate(){
    if(diceSum.value>0&&diceNumber.value>0){
        return true;
    }
}

function fact(n){
    if (n<=1){
        return (1)
    } else {
        return (n*fact(n-1))
    }
}

function msCoef(a, b){
        return fact(a)/(fact(b)*fact(a-b));
}

const rolldiceSumProb = (t, n) => {
    let s = 6, p = 0;
    
    for (let k = ((t - n) / s) | 0; k < n && k >= 0; k--)
      p += Math.pow(-1, k) 
         * msCoef(n, k) 
         * msCoef(t - s * k - 1, n - 1);
    
    return p / Math.pow(s, n);
}


var resetCanvas = function(){
    resultContainer.innerHTML = ''
    var c = document.createElement('Canvas')
    c.id = 'myCanvas'
    resultContainer.appendChild(c)
}

