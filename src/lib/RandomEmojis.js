import React from 'react'

export default function RandomEmojis({emoji, amount, minFontSize, maxFontSize}) {

    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const arrayOfCoordinates = [];

    for (let i = 0; i < amount; i++) {
        const randomFontSize = getRandomNumber(minFontSize, maxFontSize);
        const randomLeft = getRandomNumber(0, winWidth - randomFontSize);
        console.log('winWidth, randomFontSize', winWidth, randomFontSize);
        const randomTop = getRandomNumber(0, winHeight - randomFontSize);
        arrayOfCoordinates.push({ 'top': randomTop, 'left': randomLeft, 'font': randomFontSize});
    }

  return (
    <>
        {arrayOfCoordinates.map(div => (
            (<div key={div.top} className='random-emoji' style={{top: div.top, left: div.left, fontSize: div.font + 'px' }}>{emoji}</div>)
        ))}
    </>
  )
}

function getRandomNumber(min, max) {    
  return Math.random() * (max - min) + min;
}