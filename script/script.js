let width = window.innerWidth;
let height = window.innerHeight;
let rootElem = document.querySelector('.root');

/* ТЕКСТ вокруг циферблата */
// let text = "С каждой секундой у нас всё больше прошлого и меньше будущего. Цените своё настоящее!   "
let textArr = "Человек находит время для всего, что он действительно хочет!  "
let text = textArr.split('')
for (let symbol of text){
    let symbolContainer = document.createElement('div');
    symbolContainer.innerText = symbol;
    symbolContainer.classList.add('symbol');
    rootElem.appendChild(symbolContainer);
}
let step=0;
function drawCircleText(){
    let symbol = document.querySelectorAll('.symbol');
    let length = symbol.length;
    let alpha = Math.PI * 2 / length;
    step=step+alpha;
    if (step>=Math.PI * 2){step=0}
    for(let i=0; i<symbol.length; i++){
        let theta = alpha * i-0.5*Math.PI+step;
        let pointX  =  Math.round(Math.cos( theta) * 110);
        let pointY  = Math.round(Math.sin( theta ) * 110 );
        symbol[i].style.left = `${pointX + width/2-4}px`;
        symbol[i].style.top = `${pointY + height/2-8}px`;
    }

    setTimeout(drawCircleText, 1000);
}
drawCircleText();


/* ЦИФЕРБЛАТ */
let numberArr = ['XII','I', 'II','III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI' ];
for (let number of numberArr){
    let numberContainer = document.createElement('div');
    numberContainer.innerText = number;
    numberContainer.classList.add('number');
    rootElem.appendChild(numberContainer);
}
function drawCircle(){
    let number = document.querySelectorAll('.number');
    let length = number.length;
    let alpha = Math.PI * 2 / length;
    for(let i=0; i<number.length; i++){
        let theta = alpha * i-0.5*Math.PI;
        let pointX  =  Math.round(Math.cos( theta ) * 80);
        let pointY  = Math.round(Math.sin( theta ) * 80 );
        number[i].style.left = `${pointX + width/2-8}px`;
        number[i].style.top = `${pointY + height/2-8}px`;
    }
}
drawCircle();


/* СТРЕЛКИ */
for (let i=0; i<=7; i++){
    let minHandContainer = document.createElement('div');
    minHandContainer.classList.add('minHand');
    rootElem.appendChild(minHandContainer)
}
function drawHandsMin(){
    let minHand = document.querySelectorAll('.minHand');
    let date = new Date;
    let minutes = date.getMinutes();
    let alpha = Math.PI * 2 / 60*minutes-0.5*Math.PI;
    let x =width/2-2.5;
    let y =height/2-2.5;
    let radius = 0;
    for(let elem of minHand){
        let pointX  =  Math.round(Math.cos( alpha )*radius );
        let pointY  = Math.round(Math.sin( alpha )*radius );
        radius+=7;
        elem.style.left = `${pointX +x}px`;
        elem.style.top = `${pointY + y}px`;
    }
    setTimeout(drawHandsMin, 15000);
}
drawHandsMin()

for (let i=0; i<=4; i++){
    let hourHandContainer = document.createElement('div');
    hourHandContainer.classList.add('hourHand');
    rootElem.appendChild(hourHandContainer)
}
function drawHandsHour(){
    let hourHand = document.querySelectorAll('.hourHand');
    let date = new Date;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let step;
    if (minutes<15){
        step = 0
    }else if (minutes<30){
        step = Math.PI * 2 / 12/4;
    }else if (minutes<45){
        step = Math.PI * 2 / 12/4*2;
    }else if (minutes<60){
        step = Math.PI * 2 / 12/4*3;
    }
    let alpha = Math.PI * 2 / 12*hours-0.5*Math.PI+step;
    let x =width/2-4;
    let y =height/2-4;
    let radius = 0;
    for(let elem of hourHand){
        let pointX  =  Math.round(Math.cos( alpha )*radius );
        let pointY  = Math.round(Math.sin( alpha )*radius );
        radius+=9;
        elem.style.left = `${pointX +x}px`;
        elem.style.top = `${pointY + y}px`;
    }
    setTimeout(drawHandsHour, 60000);
}
drawHandsHour()

for (let i=0; i<=7; i++){
    let secHandContainer = document.createElement('div');
    secHandContainer.classList.add('secHand');
    rootElem.appendChild(secHandContainer)
}
function drawHandsSec(){
    let secHand = document.querySelectorAll('.secHand');
    let date = new Date;
    let seconds = date.getSeconds();
    let alpha = Math.PI * 2 / 60*seconds-0.5*Math.PI;
    let x =width/2-2;
    let y =height/2-2;
    let radius = 0;
    for(let elem of secHand){
        let pointX  =  Math.round(Math.cos( alpha )*radius );
        let pointY  = Math.round(Math.sin( alpha )*radius );
        radius+=8;
        elem.style.left = `${pointX +x}px`;
        elem.style.top = `${pointY + y}px`;
    }
    setTimeout(drawHandsSec, 1000);
}
drawHandsSec()


//движение часиков
let child = rootElem.children;
window.onmousemove = function (event) {
    let myX = event.clientX - width/2;
    let myY = event.clientY-height/2+110;
    let i = 0;
    function change() {
        child[i].style.marginLeft = `${myX}px`;
        child[i].style.marginTop = `${myY}px`;
        i=i+1;
        if (i===child.length){clearInterval(interval)}

    }
    let interval = setInterval(change, 20)
}

