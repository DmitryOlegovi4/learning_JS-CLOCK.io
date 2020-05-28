let width = window.innerWidth;
let height = window.innerHeight;

let rootElem = $('.root');


/* ТЕКСТ вокруг циферблата */
// let text = "С каждой секундой у нас всё больше прошлого и меньше будущего. Цените своё настоящее!   "
let text = "Человек находит время для всего, что он действительно хочет!  ".split('')
for (let symbol of text){
    let symbolContainer = $('<div>');
    symbolContainer.text(symbol);
    symbolContainer.addClass('symbol');
    rootElem.append(symbolContainer)
}
let step=0;
function drawCircleText(){
    let length = $('.symbol').length;
    let alpha = Math.PI * 2 / length;
    step=step+alpha;
    if (step>=Math.PI * 2){step=0}
    $('.symbol').each(function(index){
        let theta = alpha * index-0.5*Math.PI+step;
        let pointX  =  Math.round(Math.cos( theta) * 110);
        let pointY  = Math.round(Math.sin( theta ) * 110 );
        $(this).css('left', pointX + width/2-8 + 'px');
        $(this).css('top', pointY  + height/2-8  + 'px');
    });

    setTimeout(drawCircleText, 1000);
}
drawCircleText();


/* ЦИФЕРБЛАТ */
let numberArr = ['XII','I', 'II','III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI' ];
for (let number of numberArr){
    let numberContainer = $('<div>');
    numberContainer.text(number);
    numberContainer.addClass('number');
    rootElem.append(numberContainer)
}
function drawCircle(){
    let length = $('.number').length;
    let alpha = Math.PI * 2 / length;
    $('.number').each(function(index){
        let theta = alpha * index-0.5*Math.PI;
        let pointX  =  Math.round(Math.cos( theta ) * 80);
        let pointY  = Math.round(Math.sin( theta ) * 80 );
        $(this).css('left', pointX + width/2-8 + 'px');
        $(this).css('top', pointY  + height/2-8  + 'px');
    });
}
drawCircle();


/* СТРЕЛКИ */
for (let i=0; i<=7; i++){
    let secHandContainer = $('<div>');
    secHandContainer.addClass('secHand');
    rootElem.append(secHandContainer)
}
function drawHandsSec(){
    let date = new Date;
    let seconds = date.getSeconds();
    let alpha = Math.PI * 2 / 60*seconds-0.5*Math.PI;
    let x =width/2-2;
    let y =height/2-2;
    let radius = 0;
    $('.secHand').each(function(){
        let pointX  =  Math.round(Math.cos( alpha )*radius );
        let pointY  = Math.round(Math.sin( alpha )*radius );
        radius+=8;
        $(this).css('left', pointX + x + 'px');
        $(this).css('top', pointY  + y  + 'px');
    });
    setTimeout(drawHandsSec, 1000);
}
drawHandsSec()
for (let i=0; i<=7; i++){
    let minHandContainer = $('<div>');
    minHandContainer.addClass('minHand');
    rootElem.append(minHandContainer)
}
function drawHandsMin(){
    let date = new Date;
    let minutes = date.getMinutes();
    let alpha = Math.PI * 2 / 60*minutes-0.5*Math.PI;
    let x =width/2-2.5;
    let y =height/2-2.5;
    let radius = 0;
    $('.minHand').each(function(){
        let pointX  =  Math.round(Math.cos( alpha )*radius );
        let pointY  = Math.round(Math.sin( alpha )*radius );
        radius+=7;
        $(this).css('left', pointX + x + 'px');
        $(this).css('top', pointY  + y  + 'px');
    });
    setTimeout(drawHandsMin, 15000);
}
drawHandsMin()
for (let i=0; i<=4; i++){
    let hourHandContainer = $('<div>');
    hourHandContainer.addClass('hourHand');
    rootElem.append(hourHandContainer)
}
function drawHandsHour(){
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
    $('.hourHand').each(function(){
        let pointX  =  Math.round(Math.cos( alpha )*radius );
        let pointY  = Math.round(Math.sin( alpha )*radius );
        radius+=9;
        $(this).css('left', pointX + x + 'px');
        $(this).css('top', pointY  + y  + 'px');
    });
    setTimeout(drawHandsHour, 60000);
}
drawHandsHour()

window.onmousemove = function (event) {
    let myX = event.clientX - width/2;
    let myY = event.clientY-height/2+110;
    let length = rootElem.children().length;
    // for (let i =0; i<length; i++){
    //     setTimeout(function () {
    //         rootElem.children()[i].style.marginLeft = myX + "px";
    //         rootElem.children()[i].style.marginTop = myY + "px";
    //     }, 200)
    // }
    let i = 0;
    function change() {
        rootElem.children()[i].style.marginLeft = myX + "px";
        rootElem.children()[i].style.marginTop = myY + "px";
        i=i+1
        if (i===length-1){return}
    }
    setInterval(change, 0)
    // setTimeout(change, 0)


    // rootElem.children().each(function() {
    //         $(this).css('margin-left', myX +'px');
    //         $(this).css('margin-top', myY  + 'px');
    // });


    // $('.symbol').each(function() {
    //         $(this).css('margin-left', myX +'px');
    //         $(this).css('margin-top', myY  + 'px');
    // });
    // // $('.symbol').css('margin-left', myX +'px');
    // // $('.symbol').css('margin-top', myY  + 'px');
    // $('.number').css('margin-left', myX + 'px');
    // $('.number').css('margin-top', myY + 'px');
    // $('.secHand').css('margin-left', myX + 'px');
    // $('.secHand').css('margin-top', myY + 'px');
    // $('.minHand').css('margin-left', myX + 'px');
    // $('.minHand').css('margin-top', myY + 'px');
    // $('.hourHand').css('margin-left', myX + 'px');
    // $('.hourHand').css('margin-top', myY + 'px');

    // $('.symbol').each(function() {
    //     $(this).animate({marginLeft: `${myX}px`}, 0.5);
    //     $(this).animate({marginTop: `${myY}px`}, 0.5);
    // });
    // $('.number').animate({marginLeft: `${myX}px`}, 0.5);
    // $('.number').animate({marginTop: `${myY}px`}, 0.5);
    // $('.secHand').animate({marginLeft: `${myX}px`}, 0.5);
    // $('.secHand').animate({marginTop: `${myY}px`}, 0.5);
    // $('.minHand').animate({marginLeft: `${myX}px`}, 0.5);
    // $('.minHand').animate({marginTop: `${myY}px`}, 0.5);
    // $('.hourHand').animate({marginLeft: `${myX}px`}, 0.5);
    // $('.hourHand').animate({marginTop: `${myY}px`}, 0.5);
}
